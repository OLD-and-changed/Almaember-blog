@echo off

rmdir /S /Q output
Xcopy /E /I img output\img\
node .