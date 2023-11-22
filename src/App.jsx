
import './App.css'
import Header from './components/Header/Header'
import ItemCard from './components/ItemCard/ItemCard'
import Container from './components/Container/Container'
import { useStore } from './store'
import { useEffect } from 'react'


function App() {

const {loadData , setloadData} = useStore()


// Get All data
const getProducts = async () => {
  try {
    let resp = await fetch("https://dummyjson.com/products");
    let data = await resp.json();
    setloadData(data.products);
  } catch (error) {
    console.log(error);
  }
};





useEffect(() => {
  getProducts();
}, []);



  return (
    <div>
        <Header/>
        <Container>
          <ItemCard/>
        </Container>
    </div>
  )
}

export default App
