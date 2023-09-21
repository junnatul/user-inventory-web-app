import './index.scss';
import Header from './components/Header';
import Card from './components/Card';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import MyForm from './components/Form';

function App () {
  const [data, setData] = useState(() => {
    // Retrieve data from localStorage on initial render
    const storedData = localStorage.getItem('data');
    return storedData ? JSON.parse(storedData) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isModalOpen, setModalOpen] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  

  useEffect(() => {
    // Update localStorage whenever data changes
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const openModal = (isView, isEdit, currentIndex) => {
    setModalOpen(true);
    setIsView(isView ? true : false );  // if the value of isview is true then it will be true else its false.
    setIsEdit(isEdit ? true : false);
    setCurrentIndex(currentIndex);
  };

  const closeModal = () => {
    // console.log("closed")
    setModalOpen(false);
    setIsEdit(false);
    setIsView(false);
  };

  const handleSubmit = (newData) => {
    // console.log('Form submitted', newData);
    if (!newData) {
      return;
    }

    const someNull = Object.values(newData).some((el) => el === "");
    if (someNull) {
      return;
    }
   
    if (isEdit) {
      if (currentIndex !== null && data[currentIndex]) {
        // Update the existing entry with the new data
        const updatedData = [...data];
        updatedData[currentIndex] = newData;
        setData(updatedData);
      }
    } else {
      // Add a new entry to the data
      setData([...data, newData]);
    }
  };

  const handleDelete = (index) => {
    // Create a copy of the data array and remove the selected entry
    const updatedData = [...data];
    updatedData.splice(index, 1);

    // Update state
    setData(updatedData);

    // Update localStorage
    localStorage.setItem('data', JSON.stringify(updatedData));
  };

  let styles = {
    justifyContent: data.length > 2 ? 'space-between' : ''
  }

  return (
    <div className="App">
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit}>
        <MyForm onClose={closeModal} onSubmit={handleSubmit} isView={isView} isEdit={isEdit} data={data[currentIndex]}/>
      </Modal>

      <Header />
      <div className="container">
        <div className="head">
          <span>list of users</span>
          <button onClick={() => openModal(false, false)}>add users</button>
        </div>
        <div className="body" style={styles}>
          {
            getPaginatedData().map((object, index) => {
              return <Card data={object} key={index} currentIndex={index} openModal={openModal} handleDelete={handleDelete}/>;
            })}
        </div>
        {data.length > 6 && <div className="pagination-container">
          <button disabled={currentPage === 1} className="left">
            <img src="/images/ic_left.svg" alt="left" onClick={() => handlePageChange(currentPage - 1)} />
          </button>
          <div className="number-wrapper">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1} className={`number ${currentPage === index + 1 ? 'active' : 'inactive'}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button disabled={currentPage === totalPages} className="right">
            <img src="/images/ic_right.svg" alt="right" onClick={() => handlePageChange(currentPage + 1)} />
          </button>
        </div>}
      </div>
    </div>
  );
}

export default App;
