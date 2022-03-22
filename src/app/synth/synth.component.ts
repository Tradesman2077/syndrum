import { Component, OnInit } from '@angular/core';
import { AnyForUntypedForms } from '@angular/forms';


import * as Tone from 'tone';
import { PitchShift } from 'tone';

@Component({
  selector: 'app-synth',
  templateUrl: './synth.component.html',
  styleUrls: ['./synth.component.css']
})
export class SynthComponent implements OnInit {
  
  synth:any;
  synth2:any;
  noise:any;

  filterLp:any;

  osc1Pitch:any;
  osc1Volume:any;
  oscPitchSlider:any;

  osc2Pitch:any;
  osc2Volume:any;
  osc2PitchSlider:any;

  noiseVolume:any;
  release:any;
  pitchShift:any;

  pitchEnv:any;
  lfo:any;
  cutoff:any;
  
  constructor() {
    //lp filter
    this.filterLp = new Tone.Filter(10000, 'lowpass').toDestination();
    //oscillators
    this.synth = new Tone.Synth().connect(this.filterLp);
    this.synth2 = new Tone.Synth().connect(this.filterLp);
    this.noise = new Tone.NoiseSynth().connect(this.filterLp);

    
   }
  ngOnInit(): void {

    //init values
    this.osc1Pitch= 500;
    this.osc1Volume = 5;
    this.osc2Pitch = 500;
    this.osc2Volume = 5;
    this.noiseVolume = 5;
    this.cutoff = 1000;
    this.synth.oscillator.type = "square";
    this.synth2.oscillator.type = "square";
    

  }
  play(){
    this.synth.frequency.value = this.osc1Pitch;
    this.synth2.frequency.value = this.osc2Pitch;

    this.synth.volume.value = this.osc1Volume;
    this.synth2.volume.value = this.osc2Volume;
    this.noise.volume.value = this.noiseVolume;
  
    this.synth.envelope.release = this.release;
    this.synth2.envelope.release = this.release;
    this.noise.envelope.release = this.release;

    this.filterLp.frequency.value = this.cutoff;

    this.synth.triggerAttackRelease(this.osc1Pitch, '8n');
    //this.pitchEnv.triggerAttack();
    this.synth2.triggerAttackRelease(this.osc2Pitch, '8n');
    this.noise.triggerAttackRelease();


    
  }
  changePitch(){
    let oscPitchSlider = <HTMLInputElement>document.getElementById('pitch');
    this.osc1Pitch = oscPitchSlider.value;

  }

  changePitchOsc2(){
    let oscPitchSliderOsc2 = <HTMLInputElement>document.getElementById('pitchOsc2');
    this.osc2Pitch = oscPitchSliderOsc2.value;
  }
  changeVol(){
    let osc1Volume = <HTMLInputElement>document.getElementById('volume');
    this.osc1Volume = osc1Volume.value;
  }
  changeVolOsc2(){
    let osc2Volume = <HTMLInputElement>document.getElementById('volumeOsc2');
    this.osc2Volume = osc2Volume.value;
  }
  changeNoiseVolume(){

    let noiseVolume = <HTMLInputElement>document.getElementById('noiseVolume');
    console.log(noiseVolume);
    this.noiseVolume = noiseVolume.value;
  }
  changeRelease(){
    let releaseDom = <HTMLInputElement>document.getElementById('release');
    this.release = releaseDom.value;
    console.log(this.release);
  }
  changeLp(){
    let cutoffDom = <HTMLInputElement>document.getElementById('cutoff');
    this.cutoff = cutoffDom.value;
    console.log(this.cutoff);
  }
  
  
  


}
