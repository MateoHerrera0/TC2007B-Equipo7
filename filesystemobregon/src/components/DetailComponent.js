// cambiar las variables
const DetailComponent = (props) => {
    const dataItem = props.dataItem;
    return (
      <div>
        <section
          style={{
            width: "200px",
            float: "left",
          }}
        >
          <p> 
            <strong>Street:</strong> {dataItem.shipAddress.street}
          </p>
          <p>
            <strong>City:</strong> {dataItem.shipAddress.city}
          </p>
          <p>
            <strong>Country:</strong> {dataItem.shipAddress.country}
          </p>
          <p>
            <strong>Postal Code:</strong> {dataItem.shipAddress.postalCode}
          </p>
        </section>
        <Grid
          style={{
            width: "500px",
          }}
          data={dataItem.details}
        />
      </div>
    );
};

export default DetailComponent;