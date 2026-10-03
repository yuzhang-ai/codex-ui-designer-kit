const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync(__dirname+'/index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
const nodes=new Map();
function node(){return {value:'',hidden:false,disabled:false,textContent:'',innerHTML:'',children:[],classList:{add(){},remove(){}},setAttribute(){},removeAttribute(){},focus(){},addEventListener(){},append(...a){this.children.push(...a)},replaceChildren(){this.children=[]}};}
for(const match of html.matchAll(/id="([^"]+)"/g)) nodes.set(match[1],node());
nodes.get('draft').hidden=true;
let timer;
const storage=new Map();
const context=vm.createContext({document:{getElementById:id=>nodes.get(id),createElement:node,querySelector:()=>node()},window:{innerWidth:1440,addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},setTimeout:fn=>{timer=fn;return 1},clearTimeout(){},confirm:()=>true,console,Event:function(){}});
vm.runInContext(script,context);
function run(code){return vm.runInContext(code,context)}
assert.equal(run('extract("第一句话包含重要的信息。第二句话解释具体方法。第三句话给出一个案例。").length'),3);
nodes.get('article').value='不足三十字';nodes.get('generate').onclick();assert.match(nodes.get('composeStatus').textContent,/至少 30/);
nodes.get('article').value='阅读帮助我们理解世界，也帮助我们理解自己的经验。做笔记应该连接具体的生活情境。隔几天再回看，会产生新的理解。';
nodes.get('generate').onclick();assert.equal(run('running'),true);const stale=timer;nodes.get('cancelRun').onclick();stale();assert.equal(nodes.get('draft').hidden,true);
nodes.get('generate').onclick();timer();assert.equal(nodes.get('draft').hidden,false);assert.equal(run('running'),false);
nodes.get('saveDraft').onclick();assert.equal(run('notes.length'),1);assert.equal(JSON.parse(storage.get('yanduzhuo-notes-v1')).length,1);assert.match(nodes.get('detailStatus').textContent,/已保存/);
nodes.get('editNote').onclick();nodes.get('editTitle').value='修改后的阅读标题';nodes.get('saveEdit').onclick();assert.equal(run('notes.length'),1);assert.equal(JSON.parse(storage.get('yanduzhuo-notes-v1'))[0].title,'修改后的阅读标题');
nodes.get('editNote').onclick();nodes.get('editTitle').value='失败时应保留的草稿';context.localStorage.setItem=()=>{throw Error('quota')};nodes.get('saveEdit').onclick();assert.match(nodes.get('editStatus').textContent,/保存失败/);assert.equal(nodes.get('editTitle').value,'失败时应保留的草稿');assert.equal(run('notes[0].title'),'修改后的阅读标题');
assert.ok(html.includes('prefers-reduced-motion'));assert.ok(!/<(?:script|link)[^>]+(?:src|href)="https?:/i.test(html));
console.log('PASS: syntax, extraction, input validation, cancellation with stale callback, save/readback, editing, storage failure preservation, no remote assets. DOM stubs only; browser not verified.');
