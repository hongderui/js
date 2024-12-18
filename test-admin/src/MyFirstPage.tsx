import React, { useState } from "react";
import { Grid } from "@mui/material";
import { ListBase, WithListContext } from "react-admin";

export const MyFirstPage = (props) => {
    const [age, setAge] = useState(0);

    return (
        <ListBase resource="person" disableSyncWithLocation perPage={100}>
            <WithListContext
                render={({ data, isLoading }) => {
                    if (isLoading) {
                        return <>Sorry page is not ready</>;
                    }

                    const person = data?.[0];
                    console.log(person);

                    return (
                        <>
                            <div style={{ padding: 16 }}>
                                {/* FROM PROPS */}
                                Your name is {props.name}
                                <br />
                                Age: {age}

                                <br />
                                <br />
                                <button onClick={() => setAge(age + 1)}>
                                    Grow Up
                                </button>
                                <Grid container spacing={2}>
                                    {/* First row with one item */}
                                    <Grid item xs={12} md={3} style={{ background: "red", height: "100px" }}>
                                        Column 1 - Red
                                    </Grid>

                                    {/* Second row with one item */}
                                    <Grid item xs={12} md={3} style={{ background: "blue", height: "100px" }}>
                                        Column 2 - Blue
                                    </Grid>

                                    {/* Third row with two items */}
                                    <Grid item xs={6} md={3} style={{ background: "green", height: "100px" }}>
                                        Column 3 - Green
                                    </Grid>
                                    <Grid item xs={6} md={3} style={{ background: "yellow", height: "100px" }}>
                                        Column 4 - Yellow
                                    </Grid>
                                </Grid>
                            </div>
                        </>
                    );
                }}
            />
        </ListBase>
    );
};