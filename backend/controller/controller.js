const axios = require('axios');
const client = require('../db');

exports.getTopData = (req, res) => {
    axios.get('https://api.wazirx.com/api/v2/tickers')
        .then((response) => {
            const dataObj = response.data;
            var dataArray = Object.values(dataObj);
            dataArray = dataArray.slice(0, 10);

            client.query('DELETE FROM stocks', (err, results) => {
                if (err) {
                    console.error("Error:", err);
                } else {
                    console.log("Deleted rows:", results.rowCount);
                }
            
               
            });

            dataArray.forEach(function (element) {
                client.query(
                    `INSERT INTO stocks(name, last, buy, sell, base_unit) VALUES($1, $2, $3, $4, $5)`,
                    [element.name, element.last, element.buy, element.sell, element.base_unit],
                    (err, results) => {
                        if (err) {
                            console.error("Error:", err);
                        } else {
                            console.log("Inserted rows:", results.rowCount);
                        }
                    }
                );
            }); 

            client.query(`INSERT into stocks DEFAULT VALUES`, (err, results) => {
                if (err) {
                    console.log("Error:", err);
                } else {
                    console.log("Inserted rows:", results.rowCount);
                }
            });

            return res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
};


exports.getData=(req,res)=>{

    client.query('SELECT * FROM stocks ', (err, results) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Send the selected data to the frontend as a JSON response
            res.status(200).json({ data: results.rows });
        }

       
    });

}