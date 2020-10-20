<template>
  <div>
    <qrcode-stream @decode="onDecode"></qrcode-stream>
  </div>
</template>

<script>
// eslint-disable-next-line
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: "QR",
  components: {
    QrcodeStream,
    // eslint-disable-next-line
    QrcodeDropZone,
    // eslint-disable-next-line
    QrcodeCapture
  },
  methods: {
    // eslint-disable-next-line
    onDecode(decodedString) {},
  },
};
</script>

<style></style>
