import mode from './modeType'
export default {
    // 大播放器的显示
    isFullScreen: false,
    // 切换显示小播放器的显示
    isShowMiniPlayer: false,
    // 切换播放暂停图标
    isPlaying: false,
    // 切换循环 单个 。。。图标切换
    modeType: mode.loop,
    //显示与隐藏小型播放列表
    isShowListPlayer: false,
    //存储歌曲信息
    songs: [],
    // 当前的歌曲
    currentSong: {},
    currentIndex: 0,
    // 保存歌词
    currentLyric: {},
    // 设置歌曲的时间
    curTime: 0,
    //设置保存歌曲
    favoriteList: [],
    //播放历史存储
    historyList: [],
}