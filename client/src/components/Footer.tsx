import { makeStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#01579b",
        color: "#eceff1",
        textAlign: "center",
        padding: theme.spacing(2),
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Typography 
                variant="subtitle1"
                align="center"
                color="textSecondary"
                component="p">
                {"© "}
                <Link color="inherit" href="/">
                    HR PORTAL
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
        </footer>
    );
}
