import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import likelySubtags from "cldr-core/supplemental/likelySubtags.json";
import currencyData from "cldr-core/supplemental/currencyData.json";
import weekData from "cldr-core/supplemental/weekData.json";
import numbers from "cldr-numbers-full/main/es/numbers.json";
import currencies from "cldr-numbers-full/main/es/currencies.json";
import caGregorian from "cldr-dates-full/main/es/ca-gregorian.json";
import dateFields from "cldr-dates-full/main/es/dateFields.json";
import timeZoneNames from "cldr-dates-full/main/es/timeZoneNames.json";
load(
    likelySubtags,
    currencyData,
    weekData,
    numbers,
    currencies,
    caGregorian,
    dateFields,
    timeZoneNames
  );
import esMessages from "./filterMessages.json";
loadMessages(esMessages, "es-ES");
import { process } from "@progress/kendo-data-query";
import orders from "./orders.json"; // json de la base de datos 

const DATE_FORMAT = "yyyy-mm-dd hh:mm:ss.SSS";
const intl = new IntlService("en");
orders.forEach((o) => {
  o.orderDate = intl.parseDate(
    o.orderDate ? o.orderDate : "20/20/2020",
    DATE_FORMAT
  );
});

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

const App = () => {
    const locales = [
      {
        language: "en-US",
        locale: "en",
      },
      {
        language: "es-ES",
        locale: "es",
      },
    ];

    const [dataState, setDataState] = React.useState({
        skip: 0,
        take: 20,
        sort: [
        {
            field: "orderDate",
            dir: "desc",
        },
        ],
        group: [
        {
            field: "customerID",
        },
        ],
    });

    const [currentLocale, setCurrentLocale] = React.useState(locales[0]);
    const [dataResult, setDataResult] = React.useState(
        process(orders, dataState)
    );

    const dataStateChange = (event) => {
        setDataResult(process(orders, event.dataState));
        setDataState(event.dataState);
    };

    const expandChange = (event) => {
        const isExpanded =
          event.dataItem.expanded === undefined
            ? event.dataItem.aggregates
            : event.dataItem.expanded;
        event.dataItem.expanded = !isExpanded;
        setDataResult({ ...dataResult });
    };

    let _pdfExport;

    const exportPDF = () => {
        _pdfExport.save();
    };

    return (
        <LocalizationProvider language={currentLocale.language}>
          <IntlProvider locale={currentLocale.locale}>
            <div>
            <GridPDFExport
            ref={(element) => {
              _pdfExport = element;
            }}
            margin="1cm"
          >
            {
              <Grid
                data={process(orders, {
                  skip: dataState.skip,
                  take: dataState.take,
                })}
              >
                <GridColumn field="customerID" width="200px" />
                <GridColumn
                  field="orderDate"
                  filter="date"
                  format="{0:D}"
                  width="300px"
                />
                <GridColumn field="shipName" width="280px" />
                <GridColumn field="freight" filter="numeric" width="200px" />
                <GridColumn
                  field="shippedDate"
                  filter="date"
                  format="{0:D}"
                  width="300px"
                />
                <GridColumn field="employeeID" filter="numeric" width="200px" />
                <GridColumn
                  locked={true}
                  field="orderID"
                  filterable={false}
                  title="ID"
                  width="90px"
                />
              </Grid>
            }
          </GridPDFExport>
        </div>
      </IntlProvider>
    </LocalizationProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("my-app"));