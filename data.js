import React, { useEffect, useState } from 'react'; 

/*var data = [''];

export default data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300"
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300"
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300"
    }
  ]*/

  export default function Funktio() {

  const [pakka, setPakka] = useState([]);
  
  
  
  useEffect(() => {
      fetchCards()
  }, [])
  
  const fetchCards = async () => {
      try {
          let response = await fetch(`http://192.168.56.1:3001/howmany/5`) // oman koneen IP
          setPakka(await response.json())
      } catch (error) {
          console.log("ERROR", error)
      }
  }

    return pakka;
  }
  