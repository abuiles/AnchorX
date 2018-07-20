import * as React from 'react'
import { Image, View, StyleSheet } from 'react-native'

import { Text } from 'native-base'
import { styles as s } from 'react-native-style-tachyons'

import { formatMoney } from 'accounting'
import { DateTime } from 'luxon'
import { PaymentOperationRecord } from 'stellar-sdk'

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#E3E3E3'
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsText: {
    color: '#787F8B'
  },
  descriptionText: {
    color: '#787F8B'
  },
  person: {
    fontWeight: 'bold',
    color: '#676972'
  },
  received: {
    color: 'green',
  },
  paid: {
    color: 'red',
  }
})

export interface Props {
  account: string
  payment: PaymentOperationRecord
}


class Payment extends React.Component<Props> {
  render() {
    const { payment, account } = this.props

    let amount = payment.amount

    amount = formatMoney(payment.amount)

    const dt = DateTime.fromISO(payment.created_at)

    return (
      <View style={[styles.container, s.pa3]}>
        <Text style={[s.mb1, styles.detailsText, s.f6]}>
          {dt.toLocaleString(DateTime.DATETIME_MED)}
        </Text>
        <View style={[styles.details]}>
          <View style={{flexShrink: 1}}>
            <Text style={[styles.detailsText, s.f5]}>
              {payment.to === account && (
                 <Text>
                   <Text style={styles.person}>
                     {payment.from}
                   </Text> paid you
                 </Text>
              )}
              {payment.to !== account && (
                 <Text>
                   You paid <Text style={styles.person}>
                   {payment.to}
                   </Text>
                 </Text>
              )}
            </Text>
            <Text style={[styles.descriptionText, s.f6, s.mt1, {flexShrink: 1}]}>
              TBD - you can use this space to show memo. Also you will replace the stellarAddress by username later.
            </Text>
          </View>
          <View>
            <Text style={[payment.to === account ? styles.received : styles.paid, s.f5]}>
              {payment.to === account && <Text>+</Text>}
              {payment.to !== account && <Text>-</Text>}
              {amount}
            </Text>
          </View>
        </View>
      </View >
    )
  }
}

export default Payment
