import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function CheckIcon() {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-4 w-4 text-caribbeangreen-400"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
          />
      </svg>
  );
}

export default function AdPackageCard({ pkg }) {
  const {
      packageName,
      packagePrice,
      discountedPrice,
      jobPostLimit,
      advertisingLimit,
      packageDuration,
      resumeViews,
  } = pkg;

  const navigate = useNavigate();

  const handleBuyNow = () => {
      navigate(`/payment/${pkg._id}`); // Redirect to payment page with package ID
  };

  return (
      <div className="flex justify-center p-4 ">
          <Card className="w-full max-w-sm p-6 bg-white text-black rounded-lg shadow-md h-full">
              <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 mb-6 border-b border-gray-300 pb-4 text-center"
              >
                  <Typography
                      variant="small"
                      color="black"
                      className="font-semibold uppercase tracking-wider"
                  >
                      {packageName}
                  </Typography>
                  <Typography
                      variant="h1"
                      color="black"
                      className="mt-4 flex justify-center gap-2 text-4xl font-bold"
                  >
                      {discountedPrice > 0 ? (
                          <>
                              <span className="line-through text-red-400 text-2xl">${packagePrice}</span>{" "}
                              <span className="text-caribbeangreen-400">${discountedPrice}</span>
                          </>
                      ) : (
                          <span>${packagePrice}</span>
                      )}
                  </Typography>
              </CardHeader>
              <CardBody className="p-0">
                  <ul className="flex flex-col gap-3">
                      <li className="flex items-center gap-3">
                          <span className="rounded-full border border-gray-500 bg-gray-300 p-1">
                              <CheckIcon />
                          </span>
                          <Typography className="font-normal">
                              Package Duration: <span className="font-bold">{packageDuration}</span>
                          </Typography>
                      </li>
                      <li className="flex items-center gap-3">
                          <span className="rounded-full border border-gray-500 bg-gray-300 p-1">
                              <CheckIcon />
                          </span>
                          <Typography className="font-normal">
                              Job Post Limit: <span className="font-bold">{jobPostLimit}</span>
                          </Typography>
                      </li>
                      <li className="flex items-center gap-3">
                          <span className="rounded-full border border-gray-500 bg-gray-300 p-1">
                              <CheckIcon />
                          </span>
                          <Typography className="font-normal">
                              Advertising Limit: <span className="font-bold">{advertisingLimit}</span>
                          </Typography>
                      </li>
                      <li className="flex items-center gap-3">
                          <span className="rounded-full border border-gray-500 bg-gray-300 p-1">
                              <CheckIcon />
                          </span>
                          <Typography className="font-normal">
                              Resume Views: <span className="font-bold">{resumeViews}</span>
                          </Typography>
                      </li>
                  </ul>
              </CardBody>
              <CardFooter className="mt-6 p-0">
                  <Button
                      size="lg"
                      // color="caribbeangreen"
                      
                      className="hover:scale-105 focus:scale-105 active:scale-100 h-12 text-white bg-purple-500"
                      ripple={false}
                      fullWidth={true}
                      onClick={handleBuyNow}
                  >
                      Buy Now
                  </Button>
              </CardFooter>
          </Card>
      </div>
  );
}