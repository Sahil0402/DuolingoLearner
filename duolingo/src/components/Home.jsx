/* eslint-disable react/no-unknown-property */
import "/src/index.css";
import "../css/blobz.min.css";

const Home = () => {
  
  return (
    <div>
      <svg viewBox="0 0 2200 1400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="a">
            {/* <path
              fill="currentColor"
              d="M1011 831q-148 206-397 225T287.5 850q-77.5-225 26-405.5T659 206q242-58 371 180.5T1011 831Z"
            /> */}
          </clipPath>
          <clipPath id="b">
            {/* <path
              fill="currentColor"
              d="M1151.5 1031Q1072 1295 797 1243.5t-491-264Q90 767 255.5 467.5t482.5-250Q1055 267 1143 517t8.5 514Z"
            /> */}
          </clipPath>
          <clipPath
            id="d"
            className="tk-blob"
            style={{
              "--time": "5s",
              "--amount": "1",
              "--fill": "#58cc02",
              zIndex: "-1",
            }}
          >
            <path
              fill="currentColor"
              d="M848.5 706.5Q731 870 540.5 873t-343-163.5Q45 543 190 363t331.5-143.5Q708 256 837 399.5t11.5 307Z"
            />
          </clipPath>
          <clipPath id="f">
            <path
              fill="currentColor"
              d="M1040 866.5q-144 189.5-374.5 209T251 886Q67 677 240 448.5T697 185q284-35 385.5 228.5t-42.5 453Z"
            />
          </clipPath>
          <clipPath id="g">
            <path
              fill="currentColor"
              d="M954 802.5Q834 1005 625.5 961T246 758.5Q75 600 237 426t397-233q235-59 337.5 174T954 802.5Z"
            />
          </clipPath>
          <pattern
            id="c"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="#fff"
          >
            <circle cx="50" cy="50" r="12.5" />
          </pattern>
          <pattern
            id="e"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
            viewBox="0 0 100 100"
            fill="#57CC02"
          >
            <circle cx="50" cy="50" r="12.5" />
          </pattern>
        </defs>
        <path fill="#fff" d="M0 0h2000v1400H0z" />
        <g clip-path="url(#a)" transform="translate(841.086 -706.367)">
          <path
            fill="#57CC02"
            d="M1011 831q-148 206-397 225T287.5 850q-77.5-225 26-405.5T659 206q242-58 371 180.5T1011 831Z"
          />
        </g>
        <g clip-path="url(#b)" transform="translate(1342.527 -464.297)">
          <path
            fill="url(#c)"
            d="M1151.5 1031Q1072 1295 797 1243.5t-491-264Q90 767 255.5 467.5t482.5-250Q1055 267 1143 517t8.5 514Z"
          />
        </g>
        <g clipPath="url(#d)" transform="translate(-430.994 -119.837)">
          <path
            fill="url(#e)"
            d="M848.5 706.5Q731 870 540.5 873t-343-163.5Q45 543 190 363t331.5-143.5Q708 256 837 399.5t11.5 307Z"
          />
        </g>
        <g clipPath="url(#f)" transform="translate(1231.941 515.81)">
          <path
            fill="#b3fb50"
            d="M1040 866.5q-144 189.5-374.5 209T251 886Q67 677 240 448.5T697 185q284-35 385.5 228.5t-42.5 453Z"
          />
        </g>
        <g clipPath="url(#g)" transform="translate(-514 650)">
          <path
            fill="#86CA70"
            d="M954 802.5Q834 1005 625.5 961T246 758.5Q75 600 237 426t397-233q235-59 337.5 174T954 802.5Z"
          />
        </g>

        <foreignObject x="620" y="200" width="1000" height="2000">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ textAlign: "center", color: "black" }}
          >
            <p
              style={{
                fontSize: "50px",
                fontWeight: "bolder",
                marginBottom: "50px",
              }}
            >
              Welcome to our language learning platform!
            </p>
            <div style={{ fontSize: "30px" }}>
              <p style={{ marginBottom: "30px" }}>
                Here, you can add words from multiple languages along with their
                meanings.
              </p>
              <p style={{ marginBottom: "30px" }}>
                Feel free to add words from a variety of languages, and even
                contribute your own if it&apos;s not already available.
              </p>
              <p style={{}}>
                Plus, easily review all the words you&apos;ve added anytime.
              </p>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  );
};

export default Home;
