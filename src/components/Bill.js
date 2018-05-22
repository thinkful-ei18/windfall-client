import React, {Component, Fragment} from 'react';
import BillForm from './BillForm';
import './Bill.css';
import { connect } from 'react-redux';
import { deleteBill } from '../actions/bills-actions';

export class Bill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      editing: false,
    };

    this.togglePanel = this.togglePanel.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.togglePaid = this.togglePaid.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  togglePanel() {
    this.setState({expanded: !this.state.expanded});
  }

  togglePaid(id) {
    console.log(`Bill id:${id} toggled as paid/unpaid`);
  }

  toggleEditing() {
    this.setState({editing: !this.state.editing})
  }

  deleteBill(id) {
    console.log(`Deleting bill ${id}`);
    this.props.dispatch(deleteBill(id));
  }

render() {
  const { id, title, amount, duedate, beenpaid, interval, category_id } = this.props;

  const collapsibleIdentifier = `collapsible-${id}`;

  let info;

  if (this.state.editing) {
    info = <BillForm title={title} amount={amount} duedate={duedate} interval={interval} cancelButton={this.toggleEditing}/>
  } else {
    info =
    <div
          id={collapsibleIdentifier}
          className='collapsible'
          aria-hidden={!this.state.expanded}
        >
          <h1>{title}</h1>
          <p>${amount}</p>
          <p>
            {duedate}
            {beenpaid}
            {interval}
            {category_id}
          </p>
          <button
            onClick={() => this.togglePaid(id)}
          >
            Mark As Paid
          </button>
          <button
            onClick={() => this.toggleEditing(id)}
          >
            Edit
          </button>
          <button
            onClick={() => this.deleteBill(id)}
          >
            Delete
          </button>
        </div>
  }

  return (
    <Fragment>
        <button
          className='bill-toggle-btn'
          aria-expanded={this.state.expanded}
          aria-controls={collapsibleIdentifier}
          onClick={this.togglePanel}
        >
          <h1>{title}</h1>
          <p>${amount}</p>
        </button>
        <div
          id={collapsibleIdentifier}
          className='collapsible'
          aria-hidden={!this.state.expanded}
        >
        {info}
      </div>
    </Fragment>
    );
  }
};

Bill.defaultProps = {
  expanded: false,
  title: 'Happiness',
  amount: 0,
  duedate: '',
  beenpaid: false,
  interval: 'monthly'
}

export default connect()(Bill);