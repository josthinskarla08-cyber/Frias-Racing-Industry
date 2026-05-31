import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Modal, TextInput, Alert
} from 'react-native';

export default function CartScreen() {
  const [cart, setCart] = useState([
    {id:1,name:'Turbo GT35 Dual Scroll',brand:'GARRETT',price:1850,icon:'💨',qty:1},
    {id:2,name:'Coilovers Racing Pro',brand:'TEIN',price:920,icon:'🔩',qty:1},
  ]);
  const [payModal, setPayModal] = useState(false);
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [success, setSuccess] = useState(false);

  const changeQty = (id, delta) => {
    setCart(prev => prev
      .map(x => x.id===id ? {...x, qty: x.qty+delta} : x)
      .filter(x => x.qty > 0)
    );
  };

  const subtotal = cart.reduce((a,b) => a + b.price * b.qty, 0);
  const itbis = Math.round(subtotal * 0.18);
  const total = subtotal + itbis + 150;

  const processPayment = () => {
    if(!cardNum || !cardName || !cardExp || !cardCVV) {
      Alert.alert('Error', 'Por favor completa todos los datos de la tarjeta.');
      return;
    }
    setPayModal(false);
    setSuccess(true);
    setCart([]);
  };

  if (success) return (
    <View style={styles.successScreen}>
      <View style={styles.successIcon}><Text style={{fontSize:32}}>✓</
