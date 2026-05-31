import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, FlatList, StatusBar
} from 'react-native';

const PRODUCTS = [
  {id:1,name:'Turbo GT35 Dual Scroll',brand:'GARRETT',price:1850,cat:'turbos',avail:'high',icon:'💨'},
  {id:2,name:'Coilovers Racing Pro',brand:'TEIN',price:920,cat:'suspension',avail:'high',icon:'🔩'},
  {id:3,name:'Catre Street JDM EK',brand:'BRIDE',price:450,cat:'catres',avail:'low',icon:'🪑'},
  {id:4,name:'Downpipe 3" Sin Cat',brand:'HKS',price:380,cat:'escape',avail:'high',icon:'🔧'},
  {id:5,name:'Turbo TD06SL2 20G',brand:'TRUST',price:2100,cat:'turbos',avail:'high',icon:'💨'},
  {id:6,name:'Lowering Springs EG',brand:'SKUNK2',price:280,cat:'suspension',avail:'high',icon:'🔩'},
  {id:7,name:'Catre Racing FIA',brand:'RECARO',price:750,cat:'catres',avail:'low',icon:'🪑'},
  {id:8,name:'Escape Full Catless',brand:'MUGEN',price:620,cat:'escape',avail:'high',icon:'🔧'},
  {id:9,name:'Motor K20A TypeR',brand:'HONDA',price:3200,cat:'motor',avail:'low',icon:'⚙️'},
  {id:10,name:'Frenos Brembo 4-pistón',brand:'BREMBO',price:880,cat:'frenos',avail:'high',icon:'🔴'},
  {id:11,name:'Spoiler Duck Bill EK',brand:'MUGEN',price:290,cat:'exterior',avail:'high',icon:'🏎'},
  {id:12,name:'Intercooler FMIC 3"',brand:'MISHIMOTO',price:560,cat:'motor',avail:'high',icon:'❄️'},
];

const CATS = ['TODOS','TURBOS','SUSPENSIÓN','CATRES','ESCAPE','MOTOR','FRENOS','EXTERIOR'];

export default function StoreScreen() {
  const [activeCat, setActiveCat] = useState('TODOS');
  const [cart, setCart] = useState([]);

  const filtered = activeCat === 'TODOS'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === activeCat.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''));

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(x => x.id === product.id);
      if (ex) return prev.map(x => x.id === product.id ? {...x, qty: x.qty+1} : x);
      return [...prev, {...product, qty:1}];
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTag}>◆ JDM PERFORMANCE PARTS</Text>
        <Text style={styles.heroTitle}>POWER YOUR <Text style={styles.red}>BUILD.</Text></Text>
        <Text style={styles.heroSub}>Honda · Integra · EG · EK · DC · JDM</Text>
        <View style={styles.statsRow}>
          {[['450+','SKUs'],['100%','Auténtico'],['DOM','Envíos']].map(([n,l])=>(
            <View key={l} style={styles.stat}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLbl}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* CATEGORIAS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
        {CATS.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, activeCat===cat && styles.catChipActive]}
            onPress={() => setActiveCat(cat)}>
            <Text style={[styles.catText, activeCat===cat && styles.catTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* PRODUCTOS */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.cardImg}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardBrandSmall}>{item.brand}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardBrand}>{item.brand}</Text>
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardPrice}>${item.price.toLocaleString()}</Text>
              <Text style={[styles.cardAvail,
                item.avail==='high' ? styles.availHigh :
                item.avail==='low' ? styles.availLow : styles.availNo]}>
                {item.avail==='high' ? '● EN STOCK' : item.avail==='low' ? '◐ ÚLTIMAS UNIDADES' : '○ AGOTADO'}
              </Text>
            </View>
            <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0A0A0A'},
  hero:{backgroundColor:'#0A0A0A',padding:20,borderBottomWidth:1,borderBottomColor:'#3A0008'},
  heroTag:{color:'#E8001C',fontSize:10,letterSpacing:3,fontWeight:'600',marginBottom:8},
  heroTitle:{color:'#FFFFFF',fontSize:22,fontWeight:'900',marginBottom:4},
  red:{color:'#E8001C'},
  heroSub:{color:'#A0A0A0',fontSize:13,letterSpacing:1},
  statsRow:{flexDirection:'row',gap:24,marginTop:16},
  stat:{alignItems:'center'},
  statNum:{color:'#E8001C',fontSize:16,fontWeight:'700'},
  statLbl:{color:'#606060',fontSize:10,letterSpacing:2},
  catScroll:{backgroundColor:'#111111',borderBottomWidth:1,borderBottomColor:'#2A2A2A',maxHeight:52},
  catChip:{paddingHorizontal:16,paddingVertical:8,borderWidth:1,borderColor:'#2A2A2A',borderRadius:2,margin:8,marginRight:0},
  catChipActive:{borderColor:'#E8001C',backgroundColor:'rgba(232,0,28,0.08)'},
  catText:{color:'#A0A0A0',fontSize:11,letterSpacing:1},
  catTextActive:{color:'#E8001C'},
  card:{flex:1,backgroundColor:'#141414',margin:0.5,position:'relative'},
  cardImg:{aspectRatio:1,backgroundColor:'#161616',alignItems:'center',justifyContent:'center'},
  cardIcon:{fontSize:40},
  cardBrandSmall:{color:'#606060',fontSize:9,letterSpacing:2,marginTop:4},
  cardInfo:{padding:10},
  cardBrand:{color:'#E8001C',fontSize:9,letterSpacing:3,marginBottom:4},
  cardName:{color:'#F0F0F0',fontSize:12,fontWeight:'600',marginBottom:6,lineHeight:16},
  cardPrice:{color:'#FFFFFF',fontSize:14,fontWeight:'700'},
  cardAvail:{fontSize:9,letterSpacing:2,marginTop:4},
  availHigh:{color:'#22C55E'},
  availLow:{color:'#FF6B00'},
  availNo:{color:'#606060'},
  addBtn:{position:'absolute',bottom:0,right:0,width:32,height:32,backgroundColor:'#E8001C',alignItems:'center',justifyContent:'center'},
  addBtnText:{color:'#FFFFFF',fontSize:20,fontWeight:'300',lineHeight:32},
});
