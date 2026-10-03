

const paths: Record<string,string> = {
 spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z',
 arrow:'M4 12h16m-6-6 6 6-6 6',
 building:'M4 21V5h11v16M15 10h5v11M8 9h3M8 13h3M8 17h3M2 21h20',
 home:'m3 10 9-7 9 7M5 9v12h14V9M9 21v-7h6v7',
 shield:'m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Zm-4 9 3 3 5-6',
 check:'m5 12 4 4L19 6',
 people:'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3m20 0v-3a4 4 0 0 0-3-4M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8 0a4 4 0 0 1 0 8',
 clock:'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
 chat:'M21 11a9 9 0 0 1-9 9 11 11 0 0 1-4-1l-6 2 2-6a9 9 0 1 1 17-4Z',
 pin:'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
 mail:'M3 5h18v14H3V5Zm0 1 9 7 9-7',
 leaf:'M20 3C8 2 2 10 6 16s16 3 14-13ZM4 21 16 9',
 phone:'m7 3 3 5-3 3c1 3 3 5 6 6l3-3 5 3c-1 7-8 4-13-1S0 4 7 3Z',
};

export default function Icon({name='spark',size=24}:{name?:string;size?:number}) {return (<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.spark}/></svg>);}
