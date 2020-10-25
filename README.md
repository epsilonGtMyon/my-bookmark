# my-bookmark

## 準備した手順のメモ

スタート

```
ionic start my-bookmark blank --type vue
```


webアプリのビルド

```
ionic build
```


`android` でビルドできるようにするために追加(1回だけ)

```
ionic cap add android
```


ネイティブディレクトリにコピー

```
ionic cap copy
```


`Android Studio` で開く

```
ionic cap open android
```