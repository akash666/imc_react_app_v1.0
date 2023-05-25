
//url2 = "http://crm.iviscloud.net:777/ivis-user-management/User?action=login&userId="+"demo"+"&password="+"demo"+"&isRoles=true"
const GetToServer = async(url)=>{
    try {
      //console.log("GetToServer is hitted...");
      const response = await fetch(url);
      
      const json = await response.json();
      if (response.ok) {
        //console.log(json);
        return json;
      } else {
        var txtlog = 'Failed to get data to --> ' + url;
        console.log(txtlog);
        return null;
      }
    } 
    catch (error) {
      var txtlog = 'Got exception during the get data to --> ' + url;
      console.log(txtlog);
    }
  }
  
  const PostToServer = async(url,data)=>{
    try {
      console.log("PostToServer is hitted...");
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      }
      console.log("PostToServer--->> Data to send : ", config);
      const response = await fetch(url, config);
      console.log("PostToServer-->> response :", response);
      //const json = await response.json()
      if (response.ok) {
          //return json
          return response;
      } else {
        var txtlog = 'Failed to post data to --> ' + url;
        console.log(txtlog);
          return null;
      }
    } 
    catch (error) {
      var txtlog = 'Got exception during the post data to --> ' + url;
      console.log(txtlog);
      return error;
    }
  }
  
  module.exports = {GetToServer, PostToServer}