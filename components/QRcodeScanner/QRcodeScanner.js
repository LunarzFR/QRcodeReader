import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Modal from '../Modal/Modal';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import constants from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const QRcodeScanner = ({ isFocused }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [promotion, setPromotion] = useState();

  useEffect(() => {
		getPermissionsAsync();
  }, []);

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    fetch(`${constants.api}/coupon/${data}`)
      .then(response => response.json())
			.then(res => setPromotion(res));
  }

  return (
    <View style={styles.container}>
			{/* Active BarCodeScanner only if Tab "QR Code Reader" is active */}
      {isFocused && <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
				{/* Display text indications only if QR Code is not scanned yet */}
        {!scanned && (
          <View>
            <Text style={[styles.text, styles.scanText]}>Scan QR Code</Text>
            <Icon style={[styles.text, styles.scanArrow]} name="arrow-down" />
          </View>
        )}
      </BarCodeScanner>}

      {/* Modal with promotion's informations */}
      <Modal
        isVisible={scanned}
        setVisible={setScanned}
        promotion={promotion}
      />
    </View>
  )
}

export default QRcodeScanner;