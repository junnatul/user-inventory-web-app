import React from 'react'

function Card({ data, openModal, currentIndex, handleDelete }) {
    if (data === null) {
        return;
    }
    // console.log("key", key, currentIndex)
    const circleColor = data?.age < 25 ? 'green' : data?.age <= 50 ? 'purple' : 'orange';

  return (
    <div className='card-wrapper'>
        <div className='card-head'>
            <span>{data?.name}</span>
            <div className={`circle ${circleColor}`} />
        </div>
        <hr />

        <div className='card-body'>
            <div className='card-data'>
                <span>age:</span>
                <span>{data?.age}</span>
            </div>
            <div className='card-data'>
                <span>dob:</span>
                <span>{data?.dob}</span>
            </div>
            <div className='card-data'>
                <span>gender:</span>
                <span className='uppercase'>{data?.gender}</span>
            </div>
            <div className='card-data'>
                <span>food:</span>
                <span className='uppercase'>{data?.food}</span>
            </div>
            <div className='card-data'>
                <span>hobbies:</span>
                <span>{data?.hobbies}</span>
            </div>
        </div>
        <hr />

        <div className='buttons'>
            <button onClick={() => handleDelete(currentIndex)}>Delete</button>
            <button onClick={() => openModal(true, false, currentIndex)}>View</button>
            <button onClick={() => openModal(false, true, currentIndex)}>Edit</button>
        </div>
    </div>
  )
}

export default Card