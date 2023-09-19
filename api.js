import express from 'express'
import cors from 'cors'
import * as child from 'child_process';
import fileUpload from 'express-fileupload'
const app = express()
import Config from './src/config.js'
const port = Config.config.port;
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.options('*', cors()) // include before other routes

app.use(fileUpload({useTempFiles:true, tempFileDir : '/tmp/'}));
app.get('/', (req, res) => {
  res.append('Content-Type','application/json');
  res.send('{"success":1}');
})

app.post('/recog', (req, res) => {
  res.append('Access-Control-Allow-Origin','*');
  res.append('Content-Type','application/json');
  if(req.files == undefined || req.files == null){
   res.send('{"success":-1}');
  }else if(Object.keys(req.files).length == 1){
      if(true){
       if(req.files.file.tempFilePath !== undefined ||null){
	 var escapeShell = function(cmd) {
	   return '"'+cmd.replace(/(["'$`\\])/g,'\\$1')+'"';
	 };
         let error,stderr,stdout;
	 child.exec("songrec recognize "+escapeShell(req.files.file.tempFilePath),(error, stdout, stderr)=>{
           if(stdout !== undefined || null){
             res.send('{"success":1,"result":"'+stdout.trim()+'"}');
           }else{
             res.send('"success:3","result":"'+(error+stderr).trim()+'"')
          }
      });
     }else{
      res.send('{"success":02}');
     }
    }else{
     res.send('{"success":2}');
    }
  }else{
   res.send('{"success":0}');
  }
})

app.listen(port, () => {
  console.log(`MySong backend listening on port ${port}`)
})
