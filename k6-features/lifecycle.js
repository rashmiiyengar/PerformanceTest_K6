import http from 'k6/http';
import { check, sleep,group } from 'k6';

export const options ={
   vus:1,
   duration:'5s'
}

//Top-level code runs once on every K6 instance, before any VU (virtual user) is started.
//This part is shared across all VUs (think of it like module imports, setup of config, etc.)
console.log(' -- init stage --')


//Runs once per test run, typically used to prepare test data or authenticate.
export function setup() {
  console.log('--setup stage')
  sleep(10)
  const data={foo:'bar'}
  return data;
}

//Each VU runs the default function as defined, potentially in iterations.
export default function (data) {
    console.log('--VU stage')
    //console.log(data)
    sleep(1)
}

//Teardown also has acces to data, 
//Executed only once no mater how many VUS you have
//Runs once after all VUs have finished.
export function teardown(data) {
    console.log('--Teardown stage')
}

//Every stage (VU, setup, teardown) gets its own "init" 
//context to make sure it has everything it needs.