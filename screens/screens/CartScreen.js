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
      <View style={styles.successIcon}><Text style={{fontSize:32}}>✓</Text></View>
      <Text style={styles.successTitle}>¡PAGO EXITOSO!</Text>
      <Text style={styles.successSub}>Tu pedido fue recibido. Recibirás confirmación por WhatsApp en breve.</Text>
      <TouchableOpacity style={styles.successBtn} onPress={() => setSuccess(false)}>
        <Text style={styles.successBtnText}>SEGUIR COMPRANDO</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {cart.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🛒</Text>
            <Text style={styles.emptyText}>CARRITO VACÍO</Text>
            <Text style={styles.emptySub}>Agrega productos desde la tienda</Text>
          </View>
        ) : (
          <>
            {cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartThumb}>
                  <Text style={{fontSize:24}}>{item.icon}</Text>
                </View>
                <View style={styles.cartInfo}>
                  <Text style={styles.cartBrand}>{item.brand}</Text>
                  <Text style={styles.cartName}>{item.name}</Text>
                  <Text style={styles.cartPrice}>${(item.price * item.qty).toLocaleString()}</Text>
                  <View style={styles.qtyCtrl}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id,-1)}>
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNum}>{item.qty}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item.id,1)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setCart(prev => prev.filter(x => x.id !== item.id))}>
                  <Text style={styles.removeBtn}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* RESUMEN */}
            <View style={styles.summary}>
              {[['Subtotal', subtotal],['ITBIS (18%)', itbis],['Envío', 150]].map(([l,v]) => (
                <View key={l} style={styles.summaryRow}>
                  <Text style={styles.summaryLbl}>{l}</Text>
                  <Text style={styles.summaryVal}>${v.toLocaleString()}</Text>
                </View>
              ))}
              <View style={[styles.summaryRow, styles.summaryTotal]}>
                <Text style={styles.totalLbl}>TOTAL</Text>
                <Text style={styles.totalVal}>${total.toLocaleString()}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => setPayModal(true)}>
              <Text style={styles.checkoutText}>PROCEDER AL PAGO ►</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      {/* MODAL PAGO */}
      <Modal visible={payModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>PAGO SEGURO</Text>
                <Text style={styles.modalSub}>INGRESA TUS DATOS DE TARJETA</Text>
              </View>
              <TouchableOpacity onPress={() => setPayModal(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.secureBadge}>
              <Text style={styles.secureTxt}>🔒 ENCRIPTADO SSL 256-BIT</Text>
            </View>

            {[
              ['Número de Tarjeta', cardNum, setCardNum, '1234 5678 9012 3456', 'numeric', 19],
              ['Titular', cardName, setCardName, 'NOMBRE APELLIDO', 'default', 40],
            ].map(([lbl, val, setter, ph, kb, max]) => (
              <View key={lbl} style={styles.formGroup}>
                <Text style={styles.formLabel}>{lbl}</Text>
                <TextInput
                  style={styles.formInput}
                  value={val}
                  onChangeText={setter}
                  placeholder={ph}
                  placeholderTextColor="#606060"
                  keyboardType={kb}
                  maxLength={max}
                />
              </View>
            ))}

            <View style={styles.formRow}>
              <View style={[styles.formGroup, {flex:1}]}>
                <Text style={styles.formLabel}>Vencimiento</Text>
                <TextInput style={styles.formInput} value={cardExp} onChangeText={setCardExp}
                  placeholder="MM/AA" placeholderTextColor="#606060" maxLength={5} keyboardType="numeric"/>
              </View>
              <View style={{width:12}}/>
              <View style={[styles.formGroup, {flex:1}]}>
                <Text style={styles.formLabel}>CVV</Text>
                <TextInput style={styles.formInput} value={cardCVV} onChangeText={setCardCVV}
                  placeholder="123" placeholderTextColor="#606060" maxLength={4} keyboardType="numeric" secureTextEntry/>
              </View>
            </View>

            <View style={styles.modalTotalBox}>
              <Text style={styles.modalTotalLbl}>TOTAL A PAGAR</Text>
              <Text style={styles.modalTotalVal}>${total.toLocaleString()}</Text>
            </View>

            <TouchableOpacity style={styles.payBtn} onPress={processPayment}>
              <Text style={styles.payBtnText}>CONFIRMAR PAGO ►</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0A0A0A'},
  empty:{alignItems:'center',padding:60},
  emptyIcon:{fontSize:52,marginBottom:16,opacity:0.4},
  emptyText:{color:'#606060',fontSize:12,letterSpacing:3,marginBottom:8},
  emptySub:{color:'#606060',fontSize:12,textAlign:'center'},
  cartItem:{flexDirection:'row',alignItems:'center',gap:12,padding:14,borderBottomWidth:1,borderBottomColor:'#2A2A2A'},
  cartThumb:{width:56,height:56,backgroundColor:'#161616',borderRadius:2,borderWidth:1,borderColor:'#2A2A2A',alignItems:'center',justifyContent:'center'},
  cartInfo:{flex:1},
  cartBrand:{color:'#E8001C',fontSize:9,letterSpacing:2},
  cartName:{color:'#F0F0F0',fontSize:13,fontWeight:'600',lineHeight:18},
  cartPrice:{color:'#FFFFFF',fontSize:13,fontWeight:'700',marginTop:4},
  qtyCtrl:{flexDirection:'row',alignItems:'center',gap:8,marginTop:6},
  qtyBtn:{width:24,height:24,borderWidth:1,borderColor:'#2A2A2A',backgroundColor:'#111111',borderRadius:2,alignItems:'center',justifyContent:'center'},
  qtyBtnText:{color:'#F0F0F0',fontSize:14,lineHeight:22},
  qtyNum:{color:'#F0F0F0',fontSize:12,minWidth:20,textAlign:'center'},
  removeBtn:{color:'#606060',fontSize:18,padding:8},
  summary:{margin:16,backgroundColor:'#141414',borderWidth:1,borderColor:'#2A2A2A',borderRadius:2,padding:16},
  summaryRow:{flexDirection:'row',justifyContent:'space-between',marginBottom:10},
  summaryLbl:{color:'#A0A0A0',fontSize:13},
  summaryVal:{color:'#F0F0F0',fontSize:13},
  summaryTotal:{borderTopWidth:1,borderTopColor:'#2A2A2A',paddingTop:12,marginBottom:0},
  totalLbl:{color:'#F0F0F0',fontSize:14,fontWeight:'600'},
  totalVal:{color:'#E8001C',fontSize:16,fontWeight:'700'},
  checkoutBtn:{backgroundColor:'#E8001C',margin:16,padding:16,borderRadius:2,alignItems:'center'},
  checkoutText:{color:'#FFFFFF',fontSize:13,fontWeight:'700',letterSpacing:3},
  modalOverlay:{flex:1,backgroundColor:'rgba(0,0,0,0.85)',justifyContent:'flex-end'},
  modal:{backgroundColor:'#111111',borderTopLeftRadius:4,borderTopRightRadius:4,borderTopWidth:1,borderColor:'#3A0008',padding:24,paddingBottom:48},
  modalHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16},
  modalTitle:{color:'#FFFFFF',fontSize:14,fontWeight:'700',letterSpacing:2},
  modalSub:{color:'#606060',fontSize:10,letterSpacing:1,marginTop:4},
  modalClose:{color:'#606060',fontSize:24},
  secureBadge:{backgroundColor:'rgba(34,197,94,0.1)',borderWidth:1,borderColor:'rgba(34,197,94,0.3)',borderRadius:2,padding:8,marginBottom:20,alignSelf:'flex-start'},
  secureTxt:{color:'#22C55E',fontSize:10,letterSpacing:2},
  formGroup:{marginBottom:16},
  formLabel:{color:'#A0A0A0',fontSize:10,letterSpacing:3,marginBottom:6},
  formInput:{backgroundColor:'#161616',borderWidth:1,borderColor:'#2A2A2A',borderRadius:2,padding:12,color:'#F0F0F0',fontSize:14},
  formRow:{flexDirection:'row'},
  modalTotalBox:{backgroundColor:'#161616',borderLeftWidth:2,borderLeftColor:'#E8001C',padding:12,marginBottom:16,borderRadius:2},
  modalTotalLbl:{color:'#606060',fontSize:10,letterSpacing:1,marginBottom:4},
  modalTotalVal:{color:'#E8001C',fontSize:20,fontWeight:'700'},
  payBtn:{backgroundColor:'#E8001C',padding:16,borderRadius:2,alignItems:'center'},
  payBtnText:{color:'#FFFFFF',fontSize:13,fontWeight:'700',letterSpacing:3},
  successScreen:{flex:1,backgroundColor:'#0A0A0A',alignItems:'center',justifyContent:'center',gap:16,padding:20},
  successIcon:{width:72,height:72,borderWidth:2,borderColor:'#22C55E',borderRadius:36,alignItems:'center',justifyContent:'center'},
  successTitle:{color:'#22C55E',fontSize:18,fontWeight:'700',letterSpacing:2},
  successSub:{color:'#A0A0A0',fontSize:13,textAlign:'center',lineHeight:22,letterSpacing:1},
  successBtn:{backgroundColor:'#E8001C',paddingHorizontal:32,paddingVertical:14,borderRadius:2,marginTop:8},
  successBtnText:{color:'#FFFFFF',fontSize:11,fontWeight:'700',letterSpacing:3},
});
