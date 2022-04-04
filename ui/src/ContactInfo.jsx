
import React from 'react';
import { Table } from 'react-bootstrap';

class ContactInfo extends React.Component {
  render() {
    const info = this.props.info;
    if (info.payment) {
      return (
        <Table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{info.name}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{info.email}</td>
            </tr>
            <tr>
              <td>Payment: </td>
              <td>{info.payment}</td>
            </tr>
          </tbody>
        </Table>
      );
    } else {
      return (
        <Table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{info.name}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{info.email}</td>
            </tr>
          </tbody>
        </Table>
      );
    }
  }
}

export default ContactInfo;
