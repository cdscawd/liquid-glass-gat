

const TRACK_BORDER = 2

function getInnerTrackSize(size: SwitchLiquidGlassSize) {
  const outer = TRACK_SIZE[size]
  return {
    width: outer.width - TRACK_BORDER,
    height: outer.height - TRACK_BORDER,
  }
}
  const [trackSize, setTrackSize] = useState(getInnerTrackSize(size))
      const width = el.clientWidth
      const height = el.clientHeight