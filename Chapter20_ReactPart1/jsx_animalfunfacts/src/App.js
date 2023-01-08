import './App.css';
import { animals } from './animals'
// import oceanImg from './images/ocean.jpg'
// import lobsterImg from './images/lobster.jpg'
// import starfishImg from './images/starfish.jpg'
// import dolphinImg from './images/dolphin.jpg'

function App() {
  // console.log(animals)

  let title = ''

  const background = <img className = 'background' alt='ocean' src='/assets/images/ocean.jpg'/>

  function displayFact(e) {
    let pickedAnimal = e.target.alt;
    let animalInfo = animals[pickedAnimal];
    let randomIndex = Math.floor(Math.random() * 3);
    let fact = animalInfo.facts[randomIndex];
    document.getElementById('fact').innerHTML = fact;
    console.log(pickedAnimal)
  }


  let images = []

  for (const animal in animals) {
    images.push(
      <img 
      key={animal}
      className='animal'
      alt={animal}
      src={animals[animal].image}
      aria-lable={animal}
      role='button'
      onClick={displayFact}
      />
    )
  };

  let showBackground = false

  let animalFacts = (
    <div >
      
      <h1>{ title === '' ? 'Click an animal for a fun fact' : title}</h1>
      {(showBackground == true) && background}
      <p id='fact'></p>
      <div className='animals'>{images}</div>
    </div>
  )
  return (
    animalFacts
  );
}

export default App;
