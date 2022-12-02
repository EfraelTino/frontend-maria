import React from 'react'
import Andes from '../components/Andes'

import SubHome from '../components/SubHome'
import CardContainer from '../container/CardContainer'
import ProductList from '../container/Home'
import Intro from '../components/Intro'
import Mayor from '../components/Mayor'
import Descuento from '../components/Descuento'

export default function Layout() {
    return (
        <>
            <SubHome />
            <Descuento />
            <CardContainer />  
            <ProductList />
            <Intro /> 
            <Mayor />
            <Andes />
        </>
    )
}
