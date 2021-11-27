import React from "react";
import { styled } from "@mui/styles";
import { Grid } from "@mui/material";

const LayoutRoot = styled("div")({
  display: "flex",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

const LayoutWrapper = styled("div")({
  flex: "1 1 auto",
  marginTop: 64,
  backgroundColor: "#646881",
  overflow: "hidden",
});

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});

const LayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});

export default function Layout({ children }) {
  return (
    <LayoutRoot>
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Grid container>
              <Grid
                container
                item
                alignItems="center"
                direction="column"
                sx={{ pb: 4, mx: "auto" }}
                justifyContent="space-between"
                xs={12}
                sm={10}
                md={8}
                lg={6}
              >
                {children}
              </Grid>
            </Grid>
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
}
