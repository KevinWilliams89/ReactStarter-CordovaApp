import * as $fh from 'fh-js-sdk';

export default function cloudURL() {
  if ($fh.getCloudURL()) {
    return $fh.getCloudURL();
  }
  return 'https://mbs-yumjosxouh4si2ran3gd236w-dte.mbaas1.nwr.redhatmobile.com';
  // return 'http://127.0.0.1:8001';
}
