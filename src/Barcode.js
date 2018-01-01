import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native';
import { Constants, BarCodeScanner, Permissions, Camera } from 'expo';

export default class Barcode extends Component {
  static navigationOptions = {
    title: "Ler código de barras"
  }

  state = {
    hasCameraPermission: null
  };

  constructor(props) {
    super(props);
    this.state = {
      barcode: '',
      product: []
    }

    this.getProduct = this.getProduct.bind(this);
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  getProduct(barcode) {
    let s = this.state;
    let url = 'http://192.168.1.35:8888/ppramos-ce/mobile/barcode/' + barcode;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        s.product = data;

        this.setState(s);
      });
  }

  _handleBarCodeRead = data => {
    let s = this.state;

    s.barcode = JSON.stringify(data.data).replace('"', '').replace('"', '');
    this.setState(s)

    this.getProduct(this.state.barcode);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cameraArea}>
          {this.state.hasCameraPermission === null ?
            <Text>Solicitando permissão para usar a camera</Text> :
            this.state.hasCameraPermission === false ?
              <Text>Permissão à camera não garantida</Text> :
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{ height: 100, width: 200 }}
                autoFocus={Camera.Constants.AutoFocus.on}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
              />
          }
        </View>
        <View style={styles.barcodeArea}>
          <Text style={styles.barcode}>{this.state.barcode}</Text>
        </View>
        {this.state.product == 0 ?
        <View></View> :
        <View style={styles.productArea}>
          <Text style={styles.productName}>{this.state.product.product_name} ({this.state.product.packing})</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.rowTitle}>Marca: </Text>
            <Text style={styles.rowValue}>{this.state.product.trademark}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.rowTitle}>Quantidade em estoque: </Text>
            <Text style={styles.rowValue}>{this.state.product.quantity}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.rowTitle}>Categoria: </Text>
            <Text style={styles.rowValue}>{this.state.product.category_name}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.rowTitle}>Data da compra: </Text>
            <Text style={styles.rowValue}>{this.state.product.purchase_date}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={styles.rowTitle}>Validade: </Text>
            <Text style={styles.rowValue}>{this.state.product.expiration_date}</Text>
          </View>
        </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  cameraArea:{
    marginTop: 30
  },
  barcodeArea:{
    marginTop: 30
  },
  barcode:{
    color: '#FFF',
    textAlign: 'center'
  },
  productArea:{
    marginTop: 30,
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 10,
    width: 350
  },
  productName:{
    color: '#16a41b',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26
  },
  rowTitle:{
    color: '#FFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 16,
    marginLeft: 20
  },
  rowValue:{
    color: '#FFF',
    fontSize: 16
  }
});