import React, {Component} from 'react';
import { Field, reduxForm, focus } from "redux-form";
import Input from "./Input";

export class BillForm extends Component {
  handleFormSubmit(values) {
    console.log(values);
  }

  componentWillMount() {
    // This form is reusable; it takes props as initial values.
    this.props.initialize({
      title: this.props.title,
      amount: this.props.amount,
      duedate: this.props.duedate,
      interval: this.props.interval
    });
  }

  render() {
    const  { pristine, submitting, handleSubmit, editButton } = this.props;

    return (
      <div>
      <form
        onSubmit={handleSubmit((values) => this.handleFormSubmit(values))}
      >
        <Field
          label="Title"
          component={Input}
          type="text"
          name="title"
        />
        <Field
          label="Amount"
          component={Input}
          type="number"
          name="amount"
        />
        <Field
          label="Due Date"
          component={Input}
          type="date"
          name="date"
        />
        <Field
          label="Interval"
          component='select'
          name="interval"
        >
          <option></option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </Field>
        {/* <Field
          component='checkbox'
        >

        </Field> */}
        <button
          onClick={editButton}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pristine || submitting}
        >
          Submit
        </button>
      </form>
    </div>
    );
  }
}

export default reduxForm({
  form: "BillForm",
	onSubmitFail: (errors, dispatch) => dispatch(focus("BillForm", Object.keys(errors)[0]))
})(BillForm);