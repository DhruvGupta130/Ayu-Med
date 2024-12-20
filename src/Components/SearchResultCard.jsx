import { Card, CardContent, CardMedia, Typography, Box, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const getFormattedDetails = (value) => (value ? value : "N/A");

function SearchResultCard({ result, type }) {
  const imageSrc = result.image || `/default-${type.toLowerCase()}.jpg`;
  const linkTo = `/details/${type.toLowerCase()}/${result.id}`;
  const title = result.hospitalName || `Dr. ${result.firstName} ${result.lastName}` || result.name || "N/A";
  const description = result.description || result.specialty || "No additional details available.";

  const additionalDetails = (() => {
    if (type === "Hospital") {
      return {
        Address: `${getFormattedDetails(result?.address?.street)}, ${getFormattedDetails(result?.address?.city)}, ${getFormattedDetails(result?.address?.state)}`,
        Established: getFormattedDetails(result.establishedYear),
        Mobile: getFormattedDetails(result.mobile),
        Email: getFormattedDetails(result.email),
        Website: getFormattedDetails(result.website),
      };
    } else if (type === "Doctor") {
      return {
        Experience: `${getFormattedDetails(result.experience)} years`,
        Degree: getFormattedDetails(result.degree),
        Department: getFormattedDetails(result.department),
      };
    } else if (type === "Medication") {
      return {
        Manufacturer: getFormattedDetails(result.manufacturer),
        Price: getFormattedDetails(result.price),
        Details: getFormattedDetails(result.details),
      };
    }
    return null;
  })();

  return (
    <Card
      className="search-result-card"
      sx={{
        width: 300,
        height: "auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Link to={linkTo} className="card-link" style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            width: "100%",
            height: 200,
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            component="img"
            alt={title}
            image={imageSrc}
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <CardContent sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginTop: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          {additionalDetails && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {Object.entries(additionalDetails).map(([key, value]) => (
                <Typography
                  key={key}
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <strong>{key}:</strong> {value}
                </Typography>
              ))}
            </Box>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

SearchResultCard.propTypes = {
    result: PropTypes.shape({
        id: PropTypes.string.isRequired,
        image: PropTypes.string,
        hospitalName: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        specialty: PropTypes.string,
        address: PropTypes.shape({
            street: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
        }),
        establishedYear: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
        website: PropTypes.string,
        experience: PropTypes.number,
        degree: PropTypes.string,
        department: PropTypes.string,
        manufacturer: PropTypes.string,
        price: PropTypes.string,
        details: PropTypes.string,
    }).isRequired,
    type: PropTypes.oneOf(["Hospital", "Doctor", "Medication"]).isRequired,
};

export default SearchResultCard;
