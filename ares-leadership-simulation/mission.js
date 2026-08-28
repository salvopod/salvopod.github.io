const stage=document.body.dataset.stage;
const state=JSON.parse(sessionStorage.getItem('aresMission')||'{}');
const save=()=>sessionStorage.setItem('aresMission',JSON.stringify(state));

document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));

if(stage==='chapter1'){const clues={power:['POWER SYSTEM · LOG 7A','The storm erased the margin.','Solar input has collapsed. Batteries support every system for only six hours.','SOLAR: 04% / BATTERY: 06H / STORM: 19H'],life:['LIFE SUPPORT · LOG 3C','Six people. One fragile reserve.','The medical bay must retain an emergency oxygen reserve.','CREW: 06 / O₂: 27H / MEDICAL MINIMUM: 20%'],comms:['COMMUNICATIONS · LOG 9F','Earth cannot answer.','The team must act without external approval or guidance.','EARTH LINK: OFFLINE / AUTHORITY: LOCAL COMMAND']};
const found=new Set();
const dialog=document.querySelector('#clue-dialog');
document.querySelectorAll('.hotspot').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.clue,item=clues[key];
found.add(key);
button.classList.add('found');
document.querySelector(`#evidence-${key}`).textContent=`${item[0].split(' · ')[0]} — recovered`;
document.querySelector(`#evidence-${key}`).classList.add('found');
['label','title','copy','data'].forEach((part,index)=>document.querySelector(`#clue-${part}`).textContent=item[index]);
dialog.showModal();
if(found.size===3){const orion=document.querySelector('#orion-button');
orion.disabled=false;
orion.innerHTML='ACTIVATE ORION <small>Directive console available</small>'}}));
document.querySelector('#orion-button').addEventListener('click',()=>document.querySelector('#orion-dialog').showModal());
document.querySelector('#directive-form').addEventListener('submit',event=>{event.preventDefault();
const values=['objective','context','constraint','output'].map(key=>new FormData(event.currentTarget).get(key));
const response=document.querySelector('#orion-response');
response.classList.add('show');
if(values.some(value=>!value))response.textContent='DIRECTIVE INCOMPLETE — ORION needs all four elements.';
else if(values.every(value=>value==='correct')){response.innerHTML='<strong>ORION ONLINE.</strong><br>Directive accepted. Leadership protocol restored.';
state.chapter1=90;
save();
document.querySelector('#learning-reveal').hidden=false;
document.querySelector('#next-chapter').hidden=false}else response.innerHTML='<strong>WARNING: DIRECTIVE UNSAFE.</strong><br>Revise it to protect the crew and expose assumptions.'})}
if(stage==='chapter2'){const feedback={speed:'Speed does not reveal whether the fastest action protects the mission.',evidence:'ORION reveals a hidden assumption. Splitting the crew raises survival to 84% and preserves a repair window.',authority:'Earth cannot answer. Leadership means making purpose and trade-offs explicit.'};
document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-choice]').forEach(item=>item.classList.toggle('selected',item===button));
const choice=button.dataset.choice;
state.chapter2=choice==='evidence'?94:choice==='speed'?58:52;
save();
const result=document.querySelector('#decision-feedback');
result.textContent=feedback[choice];
result.classList.add('show');
document.querySelector('#learning-reveal').hidden=false;
document.querySelector('#chapter2-next').hidden=false}))}
if(stage==='chapter3'){const voices={engineer:['ENGINEERING CHIEF','Dr. Mara Okafor','“Someone built perfect visibility into the repair model. Outside, I can see less than two metres.”','MODEL VISIBILITY: 100% / ACTUAL: 18%'],medical:['MEDICAL OFFICER','Dr. Lev Chen','“Three crew are hiding hypoxia symptoms. Operations says available; my examinations say vulnerable.”','CREW CLEARED: 06 / MEDICALLY FIT: 03'],pilot:['OPERATIONS COMMANDER','Commander Inés Vega','“I need options I can reverse—not another probability pretending to be certainty.”','REVERSIBLE OPTIONS MODELLED: 00']};
const heard=new Set(),dialog=document.querySelector('#testimony-dialog');
document.querySelectorAll('[data-voice]').forEach(button=>button.addEventListener('click',()=>{const voice=voices[button.dataset.voice];
heard.add(button.dataset.voice);
button.classList.add('opened');
button.querySelector('i').textContent='Testimony heard';
['role','name','copy','data'].forEach((part,index)=>document.querySelector(`#voice-${part}`).textContent=voice[index]);
dialog.showModal();
if(heard.size===3)document.querySelector('#synthesis').hidden=false}));
const copy={vote:'A vote compresses disagreement and discards why people disagree.',rank:'No single expert holds the whole mission context. Ranking voices hides interdependencies.',tension:'ORION maps assumptions, protects dissenting evidence and finds a reversible repair trial.'};
document.querySelectorAll('[data-synthesis]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-synthesis]').forEach(item=>item.classList.toggle('selected',item===button));
const choice=button.dataset.synthesis;
state.chapter3=choice==='tension'?96:choice==='rank'?61:55;
save();
const result=document.querySelector('#synthesis-response');
result.textContent=copy[choice];
result.classList.add('show');
document.querySelector('#learning-reveal').hidden=false;
document.querySelector('#chapter3-next').hidden=false}))}
if(stage==='result'){const scores=[state.chapter1||60,state.chapter2||55,state.chapter3||55];
document.querySelector('#final-score').textContent=Math.round(scores.reduce((sum,value)=>sum+value,0)/scores.length);
if(scores[2]<80)document.querySelector('#result-copy').textContent='ORION produced a recommendation, but compressed important disagreement. The crew recovered the missing context together—at the cost of precious time.'}
if(stage==='debrief')document.querySelector('#copy-reflection').addEventListener('click',async()=>{const text='Where are we asking AI to answer a question leadership has not properly framed? Name the outcome, hidden assumptions, affected people and smallest reversible next step.';
try{await navigator.clipboard.writeText(text);
document.querySelector('#copy-status').textContent='Reflection prompt copied.'}catch{document.querySelector('#copy-status').textContent='Select the question above to copy it.'}});
