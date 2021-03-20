import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "salary",
      amount: 4000,
    },
    {
      id: 2,
      name: "tax",
      amount: -400,
    },
  ]);

  const addTransaction = () => {
    setTransactions((prev) => {
      return [
        {
          id: prev.length + 1,
          name,
          amount,
        },
        ...prev,
      ];
    });
    setName("");
    setAmount(0);
  };

  const getTotal = () => {
    return transactions.map((tran) => +tran.amount).reduce((a, b) => a + b, 0);
  };

  const getIncome = () => {
    return transactions
      .map((tran) => +tran.amount)
      .filter((amt) => amt > 0)
      .reduce((a, b) => a + b, 0);
  };

  const getExpense = () => {
    return transactions
      .map((tran) => +tran.amount)
      .filter((amt) => amt < 0)
      .reduce((a, b) => a + b, 0);
  };

  const renderTransaction = ({ item }) => {
    return (
      <View style={[styles.tracker, styles.item]}>
        <Text style={[styles.child]}>{item.name}</Text>
        <Text style={[styles.child]}>{item.amount.toString()}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <Text style={[styles.title, styles.total]}>{getTotal()}</Text>
      <View style={styles.tracker}>
        <Text style={[styles.label, styles.income]}>{getIncome()}</Text>
        <Text style={[styles.label, styles.expense]}>{getExpense()}</Text>
      </View>
      <Text style={styles.title}>New Transaction</Text>
      <TextInput
        style={[styles.input, styles.text]}
        onChangeText={setName}
        value={name}
        placeholder="Enter Transaction Name"
      />
      <TextInput
        style={[styles.input, styles.text]}
        onChangeText={setAmount}
        value={amount.toString()}
        placeholder="Enter Amount"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addTransaction}>
        <Text style={styles.text}>Add Transaction</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Recent Transactions</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: "#fff",
  },
  tracker: {
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  box: {
    width: 50,
    height: 50,
  },
  text: {
    height: 60,
    padding: 15,
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
  },
  title: {
    height: 60,
    padding: 15,
    color: "black",
    fontSize: 23,
    textAlign: "center",
    fontWeight: "bold",
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
  income: {
    backgroundColor: "green",
  },
  expense: {
    backgroundColor: "red",
  },
  item: {
    alignContent: "space-around",
  },
  child: {
    textAlign: "center",
    fontSize: 20,
  },
});
