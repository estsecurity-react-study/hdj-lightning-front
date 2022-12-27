const postData = async <T>(url: string, data: T) => {
  try {
    const res = await fetch(`http://localhost:3001/${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default postData;
