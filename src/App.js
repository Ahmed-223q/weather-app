import "./App.css";
import React from "react";
import Container from "@mui/material/Container";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

import axios from "axios";
import { useTranslation } from "react-i18next";

import { useEffect } from "react";
import { useState } from "react";

import moment from "moment";

function App() {
  // i18n & languages & date

  let [locale, setLocale] = useState("ar");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  function handelLangClick() {
    if (locale === "ar") {
      setLocale("en");
      i18n.changeLanguage("en");
    } else {
      setLocale("ar");
      i18n.changeLanguage("ar");
    }
  }
  //style theme
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });

  // API data
  let [temp, setTemp] = useState({
    number: null,
    description: null,
    min: null,
    max: null,
    icon: null,
    time: null,
  });

  //
  let CancelAxios = null;
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.00&lon=31.10&appid=730456ac6d00248741f8273bbd5b6727",
        {
          cancelToken: new axios.CancelToken((C) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            CancelAxios = C;
          }),
        }
      )
      .then(function (response) {
        console.log(response);
        let number = Math.floor(response.data.main.temp - 272.15);
        const description = response.data.weather[0].description;
        const min = Math.floor(response.data.main.temp_min - 272.15);
        const max = Math.floor(response.data.main.temp_max - 272.15);
        const icon = response.data.weather[0].icon;
        setTemp({
          number: number,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
          time: moment().format("MMMM Do YYYY"),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      CancelAxios();
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Container Content */}
          <div
            style={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* card */}
            <section
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 36%)",
                color: "#fff",
                padding: "10px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              }}
            >
              {/* content */}
              <div>
                {/* time & city */}
                <div

                  style={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "end",
                  }}
                >
                  <Typography variant="h2" style={{ marginRight: "10px" }}>
                    {t("Cairo")}
                  </Typography>
                  {/*  */}
                  <Typography variant="h5" style={{ marginRight: "10px" }}>
                    {temp.time}
                  </Typography>
                </div>
                {/*== time & city */}
                {/*  */}
                <hr />
                {/*  */}
                {/* Degree && Description */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* temp && status */}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "50%",
                    }}
                  >
                    {/*temp*/}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h2"
                        style={{
                          textAlign: "right",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {temp.number}
                        <img src={temp.icon} alt="img" />
                      </Typography>
                      <Typography variant="h6">
                        {t(temp.description)}
                      </Typography>
                    </div>
                    {/*==temp*/}

                    {/* min && max */}

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>
                        {t("Min")}: {temp.min}
                      </h5>
                      <h5 style={{ margin: "0px 10px" }}>|</h5>
                      <h5>
                        {t("Max")}: {temp.max}
                      </h5>
                    </div>
                    {/* ==min && max */}
                  </div>

                  {/* ==temp && status */}

                  {/* Cloud img */}
                  <CloudIcon
                    style={{
                      fontSize: "200px",
                      width: "50%",
                    }}
                  />
                  {/* ==Cloud img */}
                </div>
                {/* ==Degree && Description */}
              </div>
              {/* ==content */}
            </section>
            {/* ==card */}
            {/* trantion to english */}
            <div
              dir={locale === "ar" ? "rtl" : "ltr"}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Button
                variant="text"
                style={{ color: "#fff" }}
                onClick={handelLangClick}
              >
                {locale === "ar" ? "English" : "العربية"}
              </Button>
            </div>
            {/* ==trantion to english */}
          </div>
          {/* ==Container Content */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
