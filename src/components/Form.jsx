import React, { useState } from 'react';

function MyForm({ onSubmit, onClose, isView, isEdit, data }) {
    // console.log("currentFormData", isView, data)
  const [formData, setFormData] = useState({
    name: data?.name ? data.name : '',
    age: data?.age ? data.age : '',
    dob: data?.dob ? data.dob : '',
    gender: data?.gender ? data.gender : 'male',
    food: data?.food ? data.food : 'pizza',
    hobbies: data?.hobbies ? data.hobbies : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // console.log(formData)

  const styles = {
    backgroundColor: !isView ? '#F64F2A' : '#1677FF'
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <span>{isView ? "View User" : isEdit ? "Edit User" : "Add User"}</span>
      </div>
      <div className="form-body">
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="input_"
            value={formData.name}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            className="input_"
            value={formData.age}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="dob">DOB</label>
          <input
            type="date"
            name="dob"
            className="input-date"
            value={formData.dob}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="gender">Gender</label>
          <div className="gender-wrapper">
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
                disabled={isView}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
                disabled={isView}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="foods">Favourite Food</label>
          <div className="select-container">
            <select
              name="food"
              id="food"
              value={formData.foods}
              onChange={handleChange}
              disabled={isView}
            >
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="pasta">Pasta</option>
            </select>
          </div>
        </div>

        <div className="input-wrapper">
          <label htmlFor="hobbies">Hobbies</label>
          <textarea
            id="hobbies"
            name="hobbies"
            rows="10"
            cols="50"
            value={formData.hobbies}
            onChange={handleChange}
            disabled={isView}
          />
        </div>
      </div>
      <div className="buttons-wrapper">
        <button style={styles} onClick={onClose}>{!isView ? "Cancel" : "Close"}</button>
        {!isView && <button onClick={() => onSubmit(formData)}>Submit</button>}
      </div>
    </div>
  );
}

export default MyForm;
