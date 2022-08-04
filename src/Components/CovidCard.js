// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// // function base component
// export default function CovidCard(props) {
//   return (  // a virtual dom
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//           {props.subTitile}
//         </Typography>
//         <Typography variant="h5" component="div">
//           {props.title}
//         </Typography>
//         <Typography variant="body2">
//           Confirmed: {props.confirmed}
//         </Typography>
//         <Typography variant="body2">
//           Death: {props.deaths}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function CovidCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.subTitle}
        </Typography>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">
          Confirmed: {props.confirmed}
        </Typography>
        <Typography variant="body2">
          Deaths: {props.deaths}
        </Typography>
      </CardContent>
    </Card>
  );
}
