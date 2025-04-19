import http from 'k6/http';
import { check, sleep,group } from 'k6';

export const options ={
    thresholds:{
       'http_req_duration{expected_response:true}': ['p(95)<6000'],
       'group_duration{group:::Main Page}': ['p(95)<9000'],
       'group_duration{group:::Main Page::Assets Subgrp}': ['p(95)<3000'],
       'group_duration{group:::News Page}': ['p(95)<6000']
    }
}

export default function() {
    group('Main Page',()=>{
        let res=http.get('https://run.mocky.io/v3/be77a058-d9ee-47e2-8ac8-810f09d4cd8b?mocky-delay=5000ms');
        check(res,{'status is 200':(r)=>r.status===200});

        //the below is been refered as static assets
        //they dont change often
        //we can make the static assets as a subgroup
        group('Assets Subgrp',()=>{
            http.get('https://run.mocky.io/v3/be77a058-d9ee-47e2-8ac8-810f09d4cd8b?mocky-delay=1000ms');
            http.get('https://run.mocky.io/v3/be77a058-d9ee-47e2-8ac8-810f09d4cd8b?mocky-delay=1000ms');
        })
    });

    group('News Page',()=>{
        http.get('https://run.mocky.io/v3/4d9030be-9034-4bf4-9c40-b8dad1f81681');
    })
    sleep(1);
}