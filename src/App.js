import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Row,Col,Alert,Button,Form,Container,Nav,Navbar} from 'react-bootstrap';
import Config from './config.js'
function menu(){
  return (
    <Navbar bg="light" expand="lg">
      <div className="container-fluid">
        <Navbar.Brand href="/">MySong</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#recog">Recognize</Nav.Link>
            <Nav.Link href="https://github.com/MrCheatEugene/mysong">GitHub</Nav.Link>
            <Nav.Link href="/disclaimer">Disclaimer</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
var apiURL;
function SendReq(){
document.getElementById('alertFound').style['display']='block';
document.getElementById('alertFound').innerHTML="Please wait.";
document.getElementById('alertNotFound').style['display']='none';
document.getElementById('btn').disabled= true;
if(document.getElementById('file_recog').files.length === 0){
 alert("Select file first!");
 return 0;
}else{
if(Config.config['useorigin'] === true){
 apiURL = window.origin.split(":")[0]+":"+window.origin.split(":")[1]+':'+Config.config['port'];
}else{
 apiURL = Config.config['fullAPIurl']+':'+Config.config['port'];
}
document.getElementById('file_recog').files[0].arrayBuffer().then(buff=>{
axios.post(apiURL+'/recog',document.getElementById('form'),{  headers: {   "Content-Type": "multipart/form-data",  }}).then(resp=>{
 if(resp.data.success === 1){
   document.getElementById('alertFound').style['display']='block';
   document.getElementById('alertNotFound').style['display']='none';
   document.getElementById('alertFound').innerHTML = 'Found song: '+resp.data.result+' <a href="https://www.youtube.com/results?search_query='+encodeURIComponent(resp.data.result)+'">Search on Youtube</a>';
   document.getElementById('btn').disabled= false;
 }else{
   document.getElementById('alertFound').style['display']='none';
   document.getElementById('alertNotFound').style['display']='block';
   document.getElementById('btn').disabled= false;
 }
});
});
}
}
function Recog(){
  return (
 <div style={{color:'white'}} className="mt-3 mb-3">
   <h3>Online song recongnizer, that actually works.</h3>
   <h5>Record it, send it, recognize it.</h5>
   <Form id="form" encType="multipart/form-data" className="mt-3 mb-3" style={{border: 'white',padding:'1rem', background:'black', borderStyle:'dashed', color: 'white'}}>
   <Alert variant="success" id="alertFound" style={{display:'none'}}>
      Please wait.
   </Alert>
   <Alert variant="danger" id="alertNotFound" style={{display:'none'}}>
      Failed to find song, maybe API is unavailable right now.
   </Alert>
      <Form.Group className="mb-3">
        <Form.Label>Select a file</Form.Label>
        <Form.Control id="file_recog" type="file" name="file" placeholder="Upload a file" />
        <Form.Text className="text-muted">
          File size should be less 5MB. MP3 extenstion is recommended.
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="button" onClick={SendReq} id="btn">
        Upload
      </Button>
   </Form>
 </div>
  );
}

function Landing(){
  return(
	<img src="photo.jpg" className="img-fluid w-100" style={{margin:'unset',height:'97.5vh',zIndex:'-1',objectFit:'cover',position:'absolute',top:'3.5rem',left:'0px'}} alt=""/>
  )
}
function app(){
  return (
   <div className="container">
{Landing()}
{Recog()}
   </div>
  );
}
function MY_404() {
  return (
    <div>
    {menu()}
    {Landing()}
    <Container width="80vw" className="mt-3" style={{padding:'1rem', color: 'white'}}>
      <Row>
        <Col>
      <Alert variant="danger">
        <Alert.Heading>Aw, snap!<br></br> You got an error!</Alert.Heading>
        <p>
          404: Not found!<br></br>
          We searched as hard as we could, but we could not find and display the requested page.<br></br>
          If you believe this is an error, contact your system administrator, or who whatever deployed this website.<br></br>
          <Button variant="primary" className="mt-3" href="javascript:window.history.back()">Go back</Button>
        </p>
      </Alert>
      </Col>
      </Row>
    </Container>
    </div>
  );
}
function DISCLAIMER(){
 return(
  <div>
   {menu()}
   {Landing()}
   <Container width="80vw" className="mt-3" style={{border: 'white',padding:'1rem', background:'black', borderStyle:'dashed', color: 'white'}}>
<h2>Disclaimer</h2>
<p>
The information on this website is for general informational purposes only.<br></br>
MySong makes no representation or warranty, express or implied. Your use of the site is solely at your own risk. The information on this website is for general informational purposes only.<br></br>
This site may contain links to third party content, which we do not warrant, or assume liability for. The information on this website is for general informational purposes only.<br></br>
Information given by the website may not be true.The information on this website is for general informational purposes only.<br></br>
Website administration is not responsible for user actions.The information on this website is for general informational purposes only.<br></br>
All of illegal activities on this website are punishable by law.The information on this website is for general informational purposes only.<br></br>
</p>
   </Container>
  </div>
 );
}
function MAIN_APP() {
  return (
    <div className="App">
      {menu()}
      {app()}
    </div>
  );
}

export default {MAIN_APP,MY_404,DISCLAIMER};
