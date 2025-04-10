import http from 'k6/http';
import {check} from 'k6';

export default function() {
    const response=http.get('https://test.k6.io')
    
    check(response,{
        'status code is 200':(r)=> r.status === 200,
        'Page is home page':(r)=> r.body.includes('Collection of simple web-pages suitable for load testing')
    });
    
    

    
}