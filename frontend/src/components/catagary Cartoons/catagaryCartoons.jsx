import React from 'react'

import './catagary.scss';
import ChotaBheem from '../../assets/chotabheem.png';
import Moutpatlu from '../../assets/motupatlu.png';
import Pokimon from '../../assets/Pokemon.png';
import kids from '../../assets/Fevicol Slime Squad.png';
import KeymonAche from '../../assets/Keymon Ache.png';
import Krina from '../../assets/Krishna Balram.png';
import PakdamPakdai from '../../assets/Pakdam Pakdai.png';


const catagaryCartoons=()=>{


  return (
  <div className='bg'>
   
      <div>
      <img src={ChotaBheem} className="sliderimg"/>
      </div>
      <div>
      <img src={Moutpatlu} className="sliderimg"/>
      </div>
      <div>
      <img src={Pokimon} className="sliderimg"/>
      </div>
      <div>
      <img src={kids} className="sliderimg"/>
      </div>'
      <div>
      <img src={kids} className="sliderimg"/>
      </div> 
      <div>
      <img src={kids} className="sliderimg"/>
      </div>
      <div>
      <img src={KeymonAche} className="sliderimg"/>
      </div>
      <div>
      <img src={Krina} className="sliderimg"/>
      </div>
      <div>
      <img src={PakdamPakdai} className="sliderimg"/>
      </div>
      
      
      


  </div>
   
  );
};

export default catagaryCartoons;

// export default class catagaryCartoons extends  {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       galleryItems: [],
//     };
// }
//  getData (){
//     axios.get(`https://picsum.photos/v2/list?limit=6`, {})
//         .then(res => {
//                 const data = res.data
//               const img = data.map(m => 
//                 <img src={m.download_url} alt=""/>
//               )
//               this.setState({
//                 galleryItems: img
//               })
//             }).catch((error) => {
//                 console.log(error)
//             })
//   }
//   responsive = {
//     0: { items: 1 },
//     1024: { items: 2 },
//   }
//   componentDidMount() {
//    this.getData()
// }
  
//   render() {
//     return (
//       <div>
//         <AliceCarousel
//         items={this.state.galleryItems}
//         responsive={this.responsive}
//         autoPlayInterval={2000}
//         autoPlayDirection="rtl"
//         autoPlay={true}
//         fadeOutAnimation={true}
//         mouseTrackingEnabled={true}
//         disableAutoPlayOnAction={true}
//       />
//       </div>
//     )
//   }
// }