CXX = g++
CXXFLAGS = -O2 -std=c++11 -Wall
WASI_CXX = /home/pccoe/.local/wasi-sdk/bin/clang++

TARGET = mirror_tree
WASM_TARGET = ../public/mirror_tree.wasm

all: $(TARGET) wasm

$(TARGET): mirror_tree.cpp
	$(CXX) $(CXXFLAGS) mirror_tree.cpp -o $(TARGET)

test: $(TARGET)
	./$(TARGET) --test

wasm: mirror_tree.cpp
	@if [ -x "$(WASI_CXX)" ]; then \
		$(WASI_CXX) -O3 -fno-exceptions -fno-rtti -mexec-model=reactor \
			-Wl,--export=wasmProcessTree -Wl,--export=wasmGetVersion \
			-Wl,--export=malloc -Wl,--export=free -Wl,--export-all \
			mirror_tree.cpp -o $(WASM_TARGET); \
		echo "WASM compiled to $(WASM_TARGET)"; \
	else \
		echo "wasi-sdk clang++ not found, skipping wasm build"; \
	fi

clean:
	rm -f $(TARGET) $(WASM_TARGET)

.PHONY: all test wasm clean
