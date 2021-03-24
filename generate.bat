@echo off

rmdir /S /Q docs
Xcopy /E /I img docs\img\
node .