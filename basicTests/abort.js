import http from 'k6/http'
import {sleep} from 'k6'
import exec from 'k6/execution'

export const options={
    vus:1,
    duration:'6s'
}

export function setup(){
   let res= http.get('http.test.k6.local/status')
   if(res.error){
    exec.test.abort('aborting test application is down')
   }
}

export default function(){
    http.get('http.test.k6.local')
    sleep(1)
}