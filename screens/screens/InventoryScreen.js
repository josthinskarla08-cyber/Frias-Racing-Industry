import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar
} from 'react-native';

const INVENTORY = [
  {id:1,name:'Turbo GT35 Dual Scroll',brand:'GARRETT',cat:'TURBOS',qty:8,icon:'💨'},
  {id:2,name:'Coilovers Racing Pro',brand:'TEIN',cat:'SUSPENSION',qty:12,icon:'🔩'},
  {id:3,name:'Catre Street JDM EK',brand:'BRIDE',cat:'CATRES',qty:3,icon:'🪑'},
  {id:4,name:'Downpipe 3" Sin Cat',brand:'HKS',cat:'ESCAPE',qty:15,icon:'🔧'},
  {id:5,name:'Turbo TD06SL2 20G',brand:'TRUST',cat:'TURBOS',qty:5,icon:'💨'},
  {id:6,name:'Lowering Springs EG',brand:'SKUNK2',cat:'SUSPENSION',qty:20,icon:'🔩'},
  {id:7,name:'Catre Racing FIA',brand:'RECARO',cat:'CATRES',qty:2,icon:'🪑'},
  {id:8,name:'Escape Full Catless',brand:'MUGEN',cat:'ESCAPE',qty:9,icon:'🔧'},
  {id:9,name:'Motor K20A TypeR',brand:'HONDA',cat:'MOTOR',qty:1,icon:'⚙️'},
  {id:10,name:'Frenos Brembo 4-pistón',brand:'BREMBO',cat:'FRENOS',qty:6,icon:'🔴'},
  {id:11,name:'Spoiler Duck Bill EK',brand:'MUGEN',cat:'EXTERIOR',qty:11,icon:'🏎'},
  {id:12,name:'Intercooler FMIC 3"',brand:'MISHIMOTO',cat:'MOTOR',qty:7,icon:'❄️'},
];

const FILTERS = ['TODOS','TURBOS','SUSPENSION','CATRES','ESCAPE','MOTOR','FRENOS','EXTERIOR'];

export default function InventoryScreen() {
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const filtered = activeFilter === 'TODOS'
    ? INVENTORY
    : INVENTORY.filter(p => p.cat === activeFilter);

  const getStockColor = (qty) => {
    if (qty >= 8) return '#22C55E';
    if (qty >= 3) return '#FF6B00';
    return '#E8001C';
  };

  const getStockLabel = (qty) => {
    if (qty >= 8) return 'STOCK OK';
    if (qty >= 3) return 'STOCK BAJO';
    return 'CRÍTICO';
  };

  const totalItems = filtered.reduce((a,b) => a + b.qty, 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      {/* HEADER STATS */}
      <View style={styles.statsBar}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{filtered.length}</Text>
          <Text style={styles.statLbl}>PRODUCTOS</Text>
        </View>
        <View style={styles.statDivider}/>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalItems}</Text>
          <Text style={styles.statLbl}>UNIDADES</Text>
        </View>
        <View style={styles.statDivider}/>
        <View style={styles.statBox}>
          <Text style={[styles.statNum,{color:'#E8001C'}]}>
            {filtered.filter(p => p.qty < 3).length}
          </Text>
          <Text style={styles.statLbl}>CRÍTICOS</Text>
        </View>
      </View>

      {/* FILTROS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={{padding:10,gap:8}}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTag, activeFilter===f && styles.filterTagActive]}
            onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterText, activeFilter===f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* LISTA */}
      <ScrollView style={styles.list}>
        {filtered.map(item => (
          <View key={item.id} style={styles.invRow}>
            <View style={styles.invIcon}>
              <Text style={{fontSize:20}}>{item.icon}</Text>
            </View>
            <View style={styles.invDetail}>
              <Text style={styles.invName}>{item.name}</Text>
              <Text style={styles.invCat}>{item.cat} · {item.brand}</Text>
            </View>
            <View style={styles.invRight}>
              <Text style={[styles.invQty,{color: getStockColor(item.qty)}]}>
                {item.qty}
              </Text>
              <View style={[styles.stockBadge,{borderColor: getStockColor(item.qty)}]}>
                <Text style={[styles.stockLabel,{color: getStockColor(item.qty)}]}>
                  {getStockLabel(item.qty)}
                </Text>
              </View>
              <Text style={styles.invSku}>SKU-{String(item.id).padStart(4,'0')}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0A0A0A'},
  statsBar:{flexDirection:'row',backgroundColor:'#111111',borderBottomWidth:1,borderBottomColor:'#3A0008',padding:16},
  statBox:{flex:1,alignItems:'center'},
  statNum:{color:'#E8001C',fontSize:20,fontWeight:'700'},
  statLbl:{color:'#606060',fontSize:9,letterSpacing:2,marginTop:2},
  statDivider:{width:1,backgroundColor:'#2A2A2A',marginHorizontal:8},
  filterScroll:{backgroundColor:'#111111',borderBottomWidth:1,borderBottomColor:'#2A2A2A',maxHeight:52},
  filterTag:{paddingHorizontal:12,paddingVertical:6,borderWidth:1,borderColor:'#2A2A2A',borderRadius:2},
  filterTagActive:{borderColor:'#E8001C',backgroundColor:'rgba(232,0,28,0.08)'},
  filterText:{color:'#606060',fontSize:10,letterSpacing:2},
  filterTextActive:{color:'#E8001C'},
  list:{flex:1},
  invRow:{flexDirection:'row',alignItems:'center',gap:12,padding:14,borderBottomWidth:1,borderBottomColor:'#1E1E1E'},
  invIcon:{width:44,height:44,backgroundColor:'#161616',borderWidth:1,borderColor:'#2A2A2A',borderRadius:2,alignItems:'center',justifyContent:'center'},
  invDetail:{flex:1},
  invName:{color:'#F0F0F0',fontSize:13,fontWeight:'600'},
  invCat:{color:'#606060',fontSize:9,letterSpacing:2,marginTop:2},
  invRight:{alignItems:'flex-end',gap:4},
  invQty:{fontSize:18,fontWeight:'700'},
  stockBadge:{borderWidth:1,borderRadius:2,paddingHorizontal:6,paddingVertical:2},
  stockLabel:{fontSize:8,letterSpacing:2,fontWeight:'600'},
  invSku:{color:'#606060',fontSize:9,letterSpacing:1},
});
