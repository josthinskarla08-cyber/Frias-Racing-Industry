import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, StatusBar, Alert
} from 'react-native';

const MENU_ITEMS = [
  {icon:'📦', label:'Mis Pedidos', sub:'Ver historial de compras'},
  {icon:'❤️', label:'Favoritos', sub:'Productos guardados'},
  {icon:'📍', label:'Direcciones', sub:'Gestionar direcciones de envío'},
  {icon:'💳', label:'Métodos de Pago', sub:'Tarjetas guardadas'},
  {icon:'🔔', label:'Notificaciones', sub:'Alertas y ofertas'},
  {icon:'📞', label:'Soporte WhatsApp', sub:'Contactar a Frias Racing'},
  {icon:'⚙️', label:'Configuración', sub:'Preferencias de la app'},
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <ScrollView>

        {/* PROFILE HEADER */}
        <View style={styles.profileHead}>
          <View style={styles.avatar}>
            <Text style={{fontSize:32}}>🏎</Text>
          </View>
          <Text style={styles.profileName}>MI CUENTA</Text>
          <Text style={styles.profileId}>FRIAS RACING MEMBER</Text>

          {/* MEMBER STATS */}
          <View style={styles.memberStats}>
            <View style={styles.memberStat}>
              <Text style={styles.memberNum}>0</Text>
              <Text style={styles.memberLbl}>PEDIDOS</Text>
            </View>
            <View style={styles.memberDivider}/>
            <View style={styles.memberStat}>
              <Text style={styles.memberNum}>0</Text>
              <Text style={styles.memberLbl}>FAVORITOS</Text>
            </View>
            <View style={styles.memberDivider}/>
            <View style={styles.memberStat}>
              <Text style={styles.memberNum}>$0</Text>
              <Text style={styles.memberLbl}>GASTADO</Text>
            </View>
          </View>
        </View>

        {/* BRAND BANNER */}
        <View style={styles.brandBanner}>
          <Text style={styles.brandTag}>◆ FRIAS RACING INDUSTRY</Text>
          <Text style={styles.brandSub}>PARTES JDM AUTÉNTICAS · REPÚBLICA DOMINICANA</Text>
        </View>

        {/* MENU */}
        <View style={styles.menuList}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuRow}
              onPress={() => Alert.alert(item.label, 'Función disponible próximamente.')}>
              <View style={styles.menuIconBox}>
                <Text style={{fontSize:20}}>{item.icon}</Text>
              </View>
              <View style={styles.menuText}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* VERSION */}
        <View style={styles.versionBox}>
          <Text style={styles.versionText}>FRIAS RACING INDUSTRY v1.0.0</Text>
          <Text style={styles.versionSub}>© 2025 · Todos los derechos reservados</Text>
          <TouchableOpacity onPress={() => Alert.alert('Sesión', '¿Cerrar sesión?')}>
            <Text style={styles.logoutBtn}>CERRAR SESIÓN</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#0A0A0A'},
  profileHead:{padding:24,backgroundColor:'#0A0A0A',borderBottomWidth:1,borderBottomColor:'#3A0008',alignItems:'center'},
  avatar:{width:80,height:80,borderWidth:2,borderColor:'#E8001C',borderRadius:40,backgroundColor:'#161616',alignItems:'center',justifyContent:'center',marginBottom:12},
  profileName:{color:'#FFFFFF',fontSize:18,fontWeight:'900',letterSpacing:2,marginBottom:4},
  profileId:{color:'#606060',fontSize:10,letterSpacing:3,marginBottom:20},
  memberStats:{flexDirection:'row',backgroundColor:'#141414',borderWidth:1,borderColor:'#2A2A2A',borderRadius:2,padding:16,width:'100%'},
  memberStat:{flex:1,alignItems:'center'},
  memberNum:{color:'#E8001C',fontSize:18,fontWeight:'700'},
  memberLbl:{color:'#606060',fontSize:9,letterSpacing:2,marginTop:2},
  memberDivider:{width:1,backgroundColor:'#2A2A2A',marginHorizontal:8},
  brandBanner:{backgroundColor:'#111111',borderBottomWidth:1,borderTopWidth:1,borderColor:'#3A0008',padding:14,alignItems:'center'},
  brandTag:{color:'#E8001C',fontSize:10,letterSpacing:3,fontWeight:'600',marginBottom:4},
  brandSub:{color:'#606060',fontSize:9,letterSpacing:2},
  menuList:{padding:0},
  menuRow:{flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:20,paddingVertical:16,borderBottomWidth:1,borderBottomColor:'#1E1E1E'},
  menuIconBox:{width:40,height:40,backgroundColor:'#161616',borderRadius:2,borderWidth:1,borderColor:'#2A2A2A',alignItems:'center',justifyContent:'center'},
  menuText:{flex:1},
  menuLabel:{color:'#F0F0F0',fontSize:14,fontWeight:'500',letterSpacing:1},
  menuSub:{color:'#606060',fontSize:11,marginTop:2},
  menuArrow:{color:'#606060',fontSize:20},
  versionBox:{padding:24,alignItems:'center',gap:6},
  versionText:{color:'#606060',fontSize:10,letterSpacing:2},
  versionSub:{color:'#3A3A3A',fontSize:10,letterSpacing:1},
  logoutBtn:{color:'#E8001C',fontSize:11,letterSpacing:3,fontWeight:'700',marginTop:12,padding:8},
});
